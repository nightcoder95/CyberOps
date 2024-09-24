import pandas as pd

# Load the Excel file
df = pd.read_excel('SMM.xlsx')

# Convert to JSON and ensure special characters like Malayalam letters are preserved
df.to_json('output.json', orient='records', force_ascii=False)
