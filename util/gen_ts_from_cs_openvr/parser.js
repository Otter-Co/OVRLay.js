const keywords = {
    "using": {},
    "namespace": {},
    "public": {},
    "struct": {},
    "internal": {},
    "delegate": {},
};


function consumeFile ( fileA )
{
    let mem = {
        offset: 0
    };

    for ( let line of fileA )
    {
        let lA = line.split( ' ' );

        if ( classCheck( lA ) )
            classScan( fileA, mem );

        if ( structCheck( lA ) )
            structScan( fileA, mem );

        if ( enumCheck( lA ) )
            enumScan( fileA, mem );

        mem.offset++;
    }
}

function classScan ( fileA, mem )
{
    let curPos = mem.offset;

    let cO = {
        name: "",
        access: "",
        extends: "",
        partial: false,
        body: []
    };

    let cLA = fileA[ curPos ].split( ' ' );
    cO.name = getName( cLA, 'class' );

    console.log( cO.name );
}

function propScan ( fileA, mem )
{

}

function methodScan ( fileA, mem )
{

}

function structScan ( fileA, mem )
{
    let curPos = mem.offset;

    let sO = {
        name: "",
        access: "",
        body: []
    };

    let cLA = fileA[ curPos ].split( ' ' );
    sO.name = getName( cLA, 'struct' );

    console.log( sO.name );
}

function enumScan ( fileA, mem )
{
    let curPos = mem.offset;

    let eO = {
        name: "",
        access: "",
        body: []
    };

    let cLA = fileA[ curPos ].split( ' ' );
    eO.name = getName( cLA, 'enum' );

    console.log( eO.name );
}

function classCheck ( lineA = [] ) { return lineA.find( l => l == 'class' ); }
function propCheck ( lineA = [] ) { }
function methodCheck ( lineA = [] ) { }
function structCheck ( lineA = [] ) { return lineA.find( l => l == 'struct' ); }
function enumCheck ( lineA = [] ) { return lineA.find( l => l == 'enum' ); }

function getName ( lA, keyword )
{
    return lA[ lA.indexOf( keyword ) + 1 ];
}

module.exports[ 'consumeFile' ] = consumeFile;