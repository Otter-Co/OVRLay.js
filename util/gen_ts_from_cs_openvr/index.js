const path = require( 'path' );
const fs = require( 'fs' );

const { consumeFile } = require( './parser' );

const ovrFileP = path.resolve( __dirname, ...[ '..', '..', '3p_lib', 'open_vr', 'openvr_api.cs' ] );
const fileT = fs.readFileSync( ovrFileP ).toString();

const fileA = fileT.split( '\n' );

consumeFile( fileA );
