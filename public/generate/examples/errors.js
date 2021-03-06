
// Example of using error handling with generators

function* LuckyNumber() {
    
    try {
        
        yield 13;
        
        console.log( 'Will I get here?' );
        
    } catch( err ) {
        console.log( 'Oops!', err.message );
    }
    
    throw new Error('Nope nope nope.');
}

try {
    
    var gen = LuckyNumber();
    var number = gen.next();
    
    if (number.value === 13) {
        gen.throw( new Error( 'I did it again.' ) );
    }
    
} catch(err) {
    // We'll never get here because the error is caught inside the generator
    console.log('Caught outside genertor:', err.message);
}



try {
    
    var gen = LuckyNumber();
    
    gen.throw( new Error('batbaz') );
    
} catch(err) {
    // Because we haven't called next() yet, the Error above is caught here, NOT inside the generator
    console.log('Caught outside genertor:', err.message);
}



try {
    
    var gen = LuckyNumber();
    gen.next();
    
    throw new Error('bazfoo');
    
} catch(err) {
    // Errors thrown without using the generators .throw() method will never make it into the generator
    console.log('Caught outside genertor:', err.message);
}



try {
    var gen = LuckyNumber();
    
    var myNumber = gen.next();
    
    gen.next();
    
} catch(err) {
    // Errors thrown inside the generator can be caught outside of it
    console.log( 'Caught outside generator:', err.message );
}
