## find-close-strings

## Foreword
That problem was asked by a colleague during a job interview.
On the spot I realized I did not have any clue on how to solve it efficiently, I tested a few methods and thought I would better share them here.

## Problem
Given a list of strings of the same length.
From that list, find all the possible string pairs where the two strings differ by only one character.

## Solutions
Here are the methods I tried so far. The tree parsing methods grows much better than the 2 others. There may be a better way of solving this issue, I'll try to add other methods if I find any.

# Brute force
Make a comparison on every possible pair and keep only those that differ by one character.
That one is easy to understand, but the number of comparisons to do does not grow well.
n being the number of strings, it grows by n!

# Distance
String distance can be expressed by the Hamming distance: https://en.wikipedia.org/wiki/Hamming_distance
Given a common string reference, all the strings are grouped by their distance to the reference.
If a string A belongs to the group 2, it should be compared with all the strings of the groups 1, 2 and 3. But no need to compare with strings of other groups as there distance to A is bigger than 1.

Compared to the brute force solution, the initial setup phase takes some time.
As the number of lines grows this solution grows more slowly than the brute force.
It seems to grow exponentialy though so not scalable either.

# Tree
All the strings are referenced in a tree.
The tree is built from the letters of the strings, at depths 1 you have the first letters, depths 2 seconds letters and so on.
On the leaves we store references to the orignal strings.
By recursively traversing the tree, for every node we look at every paths to leaves and try to find if the same paths exist in sibling nodes.

This technique gives much better results than the two previous ones.



## try
You need to have nodejs installed to try it.
After having run `npm install`, you can generate a set of strings with this script
```
npm run generate -- -s 5 -l 1000 -a 5
```
And then test the generated data against various algorithms with
```
npm run test -- ./data/1000-5-5.txt
```
