- [X] What is the purpose of using _sessions_?
Sessions allow for us to maintain data persistence with regard to user authentication, so that a user does not have to keep re-entering their creditials with every request. 

- [X] What does bcrypt do to help us store passwords in a secure manner.
Since passwords should never be stored in plain text, bcrypt is a password hashing function that takes in a password and hashes it multiple times, essentially taking that password and subjecting it to an algorithm multiple times to obscure the data. 

- [X] What does bcrypt do to slow down attackers?
bycrypt subjects a password to multiple rounds of hashing. Attackers thus not only must understand the hash but also must contend with figuring out how many rounds of hashing  to which a password has been subjected. 

- [X] What are the three parts of the JSON Web Token?
The three parts of the JSON Web Token are:
    - the header, which contains the algorithm and the token type
    - the payload, which includes claims and any other information we would like to store in the token.
    - the signature