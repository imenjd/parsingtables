# **_parsingtables_**
npm package that should compute the LL(1) parsing table and the LR(0) parsing table.
(for the moment only the LL(1) table will be computed)

# **_Installing_**

`var table = require('parsingtables');`

then run:

`npm install parsingtables`



# **_Usage_**

`var grammar= ' S-> b T;'+
    ' T-> A b | B a;'+
    '  A-> a S | C B;'+
    '   B-> b D;'+
    '    C-> c D;'+
    '   D->  |c D';`

`var parse= table(grammar);`

`console.log(parse);`


# **_Output_**


`{ S: { b: [ 'S->bT' ] },
  T: { a: [ 'T->Ab' ], c: [ 'T->Ab' ], b: [ 'T->Ba' ] },
  A: { a: [ 'A->aS' ], c: [ 'A->CB' ] },
  B: { b: [ 'B->bD' ] },
  C: { c: [ 'C->cD' ] },
  D: { a: [ 'D->' ], b: [ 'D->' ], c: [ 'D->cD' ] } }`




# **_input_**

You should separate Nonterminals from their derivations by -> or → 

`A -> B`   or   `B → y`

Separate multiple symbols by blank spaces.
if two nonTerminals do not have space in between, they are considered as one!


Each set of rules must be in a newline 

or optionally multiple sets of rules can be placed at the same line as long as all of them, with the exception of the last one, are terminated by a semicolon (;)

`A → y w B;
B → C y; C → w`

Use the separator '|' with multiple derivations

`A → w y | k | f`

For Epsilon  use **ε, ϵ** or leave the derivation empty. 
The input 'null' will be considered a terminal not epsilon!

`A → B | ε
B → | K
B → j | ϵ
K →  `
