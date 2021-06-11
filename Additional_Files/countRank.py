#Script to count duplicate notes in csv file

import csv

from collections import defaultdict
from string import punctuation

ranks = defaultdict(int)

input_file = csv.reader(open('/Users/tomsv/OneDrive/Desktop/NotesData/ISynNotes1.csv', 'r', encoding='utf8'))

for row in input_file:
    row = [item.strip() for item in row]
    row = [item.strip(punctuation) for item in row]

    ranks[row[0]] += 1

with open('/Users/tomsv/OneDrive/Desktop/NotesData/duplicate_note_count.csv', 'w', encoding='utf8') as output_file:
    w = csv.writer(output_file, delimiter=';')
    for key, value in ranks.items():
        w.writerow([key, value])
