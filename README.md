# Crypto Sqare

## Description
Simple web app using javascript to take user input and encrypt is as a "crypto square".

##Rules

1. A classic method for composing secret messages is called a square code.

2. The spaces and punctuation are removed from the English text and the characters are written into a square (or rectangle) and the entire message is downcased. For example, the sentence "don't compare yourself to others, compare yourself to the person you were yesterday" is 69 characters long, so it is written into a rectangle with 8 rows and 9 columns.

| Table     |
| ---       |
| dontcompa |
| reyoursel |    
| ftoothers |   
| compareyo |   
| urselftot |   
| hepersony |   
| ouwereyes |   
| terday    |

3. he coded message is obtained by reading down the columns going left to right. For example, the message above is coded as:

| Crypto |
| ---    |
| drfcu hotoe toreu enyom |    
| spwrt oopee edcut alrra |    
| mrhrf seyms eetoy peryo |   
| neals otys              |

4. Write a program that, given a block of text, outputs the encoded version of that text.

5. The size of the square (number of columns) should be decided by the length of the message. If the message is a length that creates a perfect square (e.g. 4, 9, 16, 25, 36, etc), use that number of columns. If the message doesn't fit neatly into a square, choose the number of columns that corresponds to the smallest square that is larger than the number of characters in the message.

## License
MIT <2016> <Epicodus>