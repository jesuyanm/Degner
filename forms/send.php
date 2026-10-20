<?php
/*
 * Degner website forms: receives the Contact and Apply forms and emails them.
 * No WordPress or outside service needed. Upload the "forms" folder to public_html,
 * so this file is at https://www.degner.ca/forms/send.php.
 *
 * Email only arrives reliably once the hosting server is allowed to send as @degner.ca
 * (the SPF record in the domain's DNS), otherwise Microsoft 365 may put it in junk.
 */

// ---- Settings ----------------------------------------------------------------

// Where each form is sent.
$SEND_TO = array(
	'contact' => 'info@degner.ca',
	'apply'   => 'hr@degner.ca',
);

// Who the emails come from. Replies go to the person who filled in the form.
$FROM_EMAIL = 'website@degner.ca';
$FROM_NAME  = array(
	'contact' => 'Degner Website',
	'apply'   => 'Degner Careers',
);

$MAX_FILE_BYTES = 5 * 1024 * 1024; // per file, matches the 5 MB shown on the form
$MAX_PER_HOUR   = 5;               // submissions per visitor per hour
$MIN_SECONDS    = 3;               // faster than this is a bot

// Shown when something goes wrong, so people can still reach us.
$FALLBACK = array(
	'contact' => 'call 780-960-8723',
	'apply'   => 'email your resume to hr@degner.ca',
);

// -------------------------------------------------------------------------------

header( 'X-Robots-Tag: noindex' );

if ( 'POST' !== $_SERVER['REQUEST_METHOD'] ) {
	header( 'Allow: POST' );
	respond( 405, false, 'This address only accepts form submissions.' );
}

// Files bigger than the server allows empty the whole submission.
if ( empty( $_POST ) && ! empty( $_SERVER['CONTENT_LENGTH'] ) ) {
	respond( 413, false, 'Your files are too large. Each file must be under 5 MB.' );
}

$form = field( 'form', 20 );
if ( ! isset( $SEND_TO[ $form ] ) ) {
	respond( 400, false, 'Unknown form.' );
}
$fallback = $FALLBACK[ $form ];

// Spam checks. Bots are told it worked so they don't try again.
if ( '' !== field( 'botcheck', 10 ) ) {
	respond( 200, true );
}
if ( ! isset( $_POST['elapsed'] ) ) {
	respond( 400, false, 'Your browser blocked part of this form. Please try again or ' . $fallback . '.' );
}
if ( (int) $_POST['elapsed'] < $MIN_SECONDS * 1000 ) {
	respond( 200, true );
}
$visitor = sha1( 'degner' . ( isset( $_SERVER['REMOTE_ADDR'] ) ? $_SERVER['REMOTE_ADDR'] : '' ) );
$testing = '1' === getenv( 'DEGNER_FORMS_TEST' ); // set only by dev/test-forms.ps1 on your own computer
if ( ! $testing && count_recent( $visitor, false ) >= $MAX_PER_HOUR ) {
	respond( 429, false, 'Too many submissions. Please try again later or ' . $fallback . '.' );
}

// Fields.
$name  = field( 'name', 100 );
$email = field( 'email', 200 );
if ( '' === $name ) {
	respond( 400, false, 'Please enter your name.' );
}
if ( ! filter_var( $email, FILTER_VALIDATE_EMAIL ) ) {
	respond( 400, false, 'Please enter a valid email address.' );
}

$attachments = array();

if ( 'contact' === $form ) {
	$subject = field( 'subject', 200 );
	$message = field( 'message', 5000, true );
	if ( '' === $subject || '' === $message ) {
		respond( 400, false, 'Please fill in the subject and message.' );
	}
	$email_subject = 'Website inquiry: ' . $subject;
	$body = "New message from the Contact Us form on degner.ca\n\n"
		. "Name:    $name\n"
		. "Email:   $email\n"
		. "Subject: $subject\n\n"
		. "$message\n";
} else {
	$phone    = field( 'phone', 40 );
	$position = field( 'position', 150 );
	foreach ( array( 'resume' => 'Resume', 'cover_letter' => 'Cover letter' ) as $key => $label ) {
		$file = upload( $key, $label, $MAX_FILE_BYTES );
		if ( $file ) {
			$attachments[] = $file;
		}
	}
	$email_subject = 'Job application: ' . $name . ( '' !== $position ? ' (' . $position . ')' : '' );
	$files_list    = array();
	foreach ( $attachments as $file ) {
		$files_list[] = $file['label'] . ': ' . $file['name'];
	}
	$body = "New application from the Apply Now form on degner.ca\n\n"
		. "Name:     $name\n"
		. "Email:    $email\n"
		. 'Phone:    ' . ( '' !== $phone ? $phone : '-' ) . "\n"
		. 'Position: ' . ( '' !== $position ? $position : '-' ) . "\n\n"
		. 'Attached: ' . ( $files_list ? implode( ', ', $files_list ) : 'no files' ) . "\n";
}

if ( ! send_email( $SEND_TO[ $form ], $FROM_EMAIL, $FROM_NAME[ $form ], $name, $email, $email_subject, $body, $attachments ) ) {
	respond( 500, false, 'Your message could not be sent. Please try again or ' . $fallback . '.' );
}

if ( ! $testing ) {
	count_recent( $visitor, true );
}
respond( 200, true );


// ---- Helpers -------------------------------------------------------------------

// A posted text field: trimmed, length-limited, no control characters (and no line breaks unless $multiline).
function field( $key, $max, $multiline = false ) {
	$value = isset( $_POST[ $key ] ) && is_string( $_POST[ $key ] ) ? $_POST[ $key ] : '';
	$value = str_replace( array( "\r\n", "\r" ), "\n", $value );
	$value = $multiline
		? preg_replace( '/[^\P{C}\n\t]/u', '', $value )
		: preg_replace( '/\p{C}+/u', ' ', $value );
	$value = trim( (string) $value );
	if ( function_exists( 'mb_substr' ) ) {
		return mb_substr( $value, 0, $max, 'UTF-8' );
	}
	return substr( $value, 0, $max );
}

// An uploaded PDF/DOC/DOCX, checked by extension and by its first bytes. Returns null when none was chosen.
function upload( $key, $label, $max_bytes ) {
	if ( empty( $_FILES[ $key ] ) || ! is_array( $_FILES[ $key ]['error'] ) && UPLOAD_ERR_NO_FILE === $_FILES[ $key ]['error'] ) {
		return null;
	}
	$f = $_FILES[ $key ];
	if ( is_array( $f['error'] ) ) {
		respond( 400, false, 'Please choose one file for your ' . strtolower( $label ) . '.' );
	}
	if ( UPLOAD_ERR_INI_SIZE === $f['error'] || UPLOAD_ERR_FORM_SIZE === $f['error'] || $f['size'] > $max_bytes ) {
		respond( 400, false, $label . ' is too large. The maximum size is 5 MB.' );
	}
	if ( UPLOAD_ERR_OK !== $f['error'] || ! is_uploaded_file( $f['tmp_name'] ) ) {
		respond( 400, false, $label . ' could not be uploaded. Please try again.' );
	}

	$types = array(
		'pdf'  => array( 'application/pdf', '%PDF' ),
		'doc'  => array( 'application/msword', "\xD0\xCF\x11\xE0" ),
		'docx' => array( 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', "PK\x03\x04" ),
	);
	$ext = strtolower( pathinfo( $f['name'], PATHINFO_EXTENSION ) );
	$data = file_get_contents( $f['tmp_name'] );
	if ( ! isset( $types[ $ext ] ) || false === $data || 0 !== strpos( $data, $types[ $ext ][1] ) ) {
		respond( 400, false, $label . ' must be a PDF, DOC or DOCX file.' );
	}

	$base = preg_replace( '/[^A-Za-z0-9._-]+/', '_', pathinfo( $f['name'], PATHINFO_FILENAME ) );
	$base = trim( substr( $base, 0, 80 ), '._' );
	return array(
		'label' => $label,
		'name'  => ( '' !== $base ? $base : strtolower( str_replace( ' ', '-', $label ) ) ) . '.' . $ext,
		'type'  => $types[ $ext ][0],
		'data'  => $data,
	);
}

function send_email( $to, $from_email, $from_name, $reply_name, $reply_email, $subject, $body, $attachments ) {
	$boundary = 'degner-' . md5( uniqid( '', true ) );
	$headers  = array(
		'From: ' . encode_header( $from_name ) . ' <' . $from_email . '>',
		'Reply-To: ' . encode_header( $reply_name ) . ' <' . $reply_email . '>',
		'MIME-Version: 1.0',
		'Content-Type: multipart/mixed; boundary="' . $boundary . '"',
	);

	$message = "--$boundary\r\n"
		. "Content-Type: text/plain; charset=UTF-8\r\n"
		. "Content-Transfer-Encoding: base64\r\n\r\n"
		. chunk_split( base64_encode( str_replace( "\n", "\r\n", $body ) ) );
	foreach ( $attachments as $file ) {
		$message .= "--$boundary\r\n"
			. 'Content-Type: ' . $file['type'] . '; name="' . $file['name'] . "\"\r\n"
			. "Content-Transfer-Encoding: base64\r\n"
			. 'Content-Disposition: attachment; filename="' . $file['name'] . "\"\r\n\r\n"
			. chunk_split( base64_encode( $file['data'] ) );
	}
	$message .= "--$boundary--\r\n";

	$headers = implode( "\r\n", $headers );
	$subject = encode_header( $subject );

	// -f sets the bounce address to @degner.ca, which is what the SPF check looks at.
	if ( @mail( $to, $subject, $message, $headers, '-f' . $from_email ) ) {
		return true;
	}
	return @mail( $to, $subject, $message, $headers );
}

function encode_header( $text ) {
	return '=?UTF-8?B?' . base64_encode( $text ) . '?=';
}

// How many times this visitor sent a form in the last hour; $add records one more.
// Kept in a .php file that exits immediately, so it can't be read from the web.
function count_recent( $visitor, $add ) {
	$path = __DIR__ . '/sent-log.php';
	$fh   = @fopen( $path, 'c+' );
	if ( ! $fh ) {
		return 0;
	}
	flock( $fh, LOCK_EX );
	$raw  = stream_get_contents( $fh );
	$log  = json_decode( (string) substr( $raw, strpos( $raw . "\n", "\n" ) + 1 ), true );
	$log  = is_array( $log ) ? $log : array();
	$now  = time();
	foreach ( $log as $key => $times ) {
		$log[ $key ] = array_values( array_filter( (array) $times, function ( $t ) use ( $now ) {
			return $t > $now - 3600;
		} ) );
		if ( ! $log[ $key ] ) {
			unset( $log[ $key ] );
		}
	}
	if ( $add ) {
		$log[ $visitor ][] = $now;
	}
	ftruncate( $fh, 0 );
	rewind( $fh );
	fwrite( $fh, "<?php exit; ?>\n" . json_encode( $log ) );
	flock( $fh, LOCK_UN );
	fclose( $fh );
	return isset( $log[ $visitor ] ) ? count( $log[ $visitor ] ) : 0;
}

// Answers the page's script with JSON, or shows a simple page if the form was sent without it.
function respond( $status, $ok, $message = '' ) {
	http_response_code( $status );
	$accept = isset( $_SERVER['HTTP_ACCEPT'] ) ? $_SERVER['HTTP_ACCEPT'] : '';
	if ( false !== strpos( $accept, 'application/json' ) ) {
		header( 'Content-Type: application/json; charset=UTF-8' );
		echo json_encode( array( 'success' => $ok, 'message' => $message ) );
		exit;
	}
	header( 'Content-Type: text/html; charset=UTF-8' );
	$text = $ok ? 'Thank you. We have received your submission.' : $message;
	echo '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">'
		. '<title>Degner Construction</title>'
		. '<body style="font-family:sans-serif;max-width:32rem;margin:4rem auto;padding:0 1rem;line-height:1.5">'
		. '<p>' . htmlspecialchars( $text, ENT_QUOTES, 'UTF-8' ) . '</p><p><a href="/">Back to degner.ca</a></p>';
	exit;
}
