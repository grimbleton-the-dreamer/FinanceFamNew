import pandas as pd
from io import StringIO

# -----------------------------
# Step 1: Load the Data
# -----------------------------

# Provided data as a multi-line string
data = """ID\tSemester\tGender\tExamScore\tExamPrediction\tExamNumber\tIsCovid
1\tFall2019\tF\t69\t70\t1\tNo
2\tFall2019\tM\t75\t80\t1\tNo
3\tFall2019\tF\t60\t70\t1\tNo
4\tFall2019\tF\t97.5\t90\t1\tNo
5\tFall2019\tF\t77.5\t84\t1\tNo
6\tFall2019\tM\t90\t90\t1\tNo
7\tFall2019\tM\t62.5\t75\t1\tNo
8\tFall2019\tM\t87.5\t86\t1\tNo
9\tFall2019\tM\t65\t80\t1\tNo
10\tFall2019\tF\t80\t84\t1\tNo
11\tFall2019\tM\t70\t84\t1\tNo
12\tFall2019\tF\t75\t86\t1\tNo
13\tFall2019\tM\t82.5\t82\t1\tNo
14\tFall2019\tM\t35\t93\t1\tNo
15\tFall2019\tM\t75\t82\t1\tNo
16\tFall2019\tF\t70\t80\t1\tNo
17\tFall2019\tF\t75\t85\t1\tNo
18\tFall2019\tF\t75\t85\t1\tNo
19\tFall2019\tF\t62.5\t85\t1\tNo
20\tFall2019\tM\t90\t88\t1\tNo
21\tFall2019\tF\t95\t84\t1\tNo
22\tFall2019\tF\t74\t83\t1\tNo
23\tFall2019\tF\t60\t85\t1\tNo
24\tFall2019\tM\t72.5\t75\t1\tNo
25\tFall2019\tM\t90\t93\t1\tNo
26\tFall2019\tF\t80\t75\t1\tNo
27\tFall2019\tM\t82.5\t80\t1\tNo
28\tFall2019\tM\t85\t90\t1\tNo
29\tFall2019\tF\t72\t84\t1\tNo
30\tFall2019\tM\t97.5\t95\t1\tNo
31\tFall2019\tM\t50\t70\t1\tNo
32\tFall2019\tF\t72.5\t80\t1\tNo
33\tFall2019\tF\t62.5\t80\t1\tNo
34\tFall2019\tF\t85\t85\t1\tNo
35\tFall2019\tF\t45\t70\t1\tNo
36\tFall2019\tM\t77.5\t92\t1\tNo
37\tFall2019\tM\t80\t84\t1\tNo
38\tFall2019\tM\t87.5\t87\t1\tNo
39\tFall2019\tF\t57.5\t78\t1\tNo
40\tFall2019\tM\t60\t84\t1\tNo
41\tFall2019\tF\t77.5\t84\t1\tNo
42\tFall2019\tM\t92.5\t92\t1\tNo
43\tFall2019\tM\t82\t84\t1\tNo
44\tSpring2020\tM\t92.5\t90\t1\tNo
45\tSpring2020\tF\t72.5\t68\t1\tNo
46\tSpring2020\tF\t97.5\t90\t1\tNo
47\tSpring2020\tF\t100\t98\t1\tNo
48\tSpring2020\tM\t87.5\t85\t1\tNo
49\tSpring2020\tM\t72.5\t83\t1\tNo
50\tSpring2020\tM\t75\t93\t1\tNo
51\tSpring2020\tF\t70\t85\t1\tNo
52\tSpring2020\tF\t47.5\t89\t1\tNo
53\tSpring2020\tF\t67.5\t73\t1\tNo
54\tSpring2020\tF\t75\t75\t1\tNo
55\tSpring2020\tM\t70\t75\t1\tNo
56\tSpring2020\tF\t65\t88\t1\tNo
57\tSpring2020\tM\t82.5\t88\t1\tNo
58\tSpring2020\tM\t52.5\t80\t1\tNo
59\tSpring2020\tF\t55\t95\t1\tNo
60\tSpring2020\tF\t65\t82\t1\tNo
61\tSpring2020\tF\t72.5\t84\t1\tNo
62\tSpring2020\tF\t80\t80\t1\tNo
63\tSpring2020\tM\t52.5\t78\t1\tNo
64\tSpring2020\tF\t87.5\t83\t1\tNo
65\tSpring2020\tM\t100\t85\t1\tNo
66\tSpring2020\tF\t52.5\t99\t1\tNo
67\tSpring2020\tM\t100\t80\t1\tNo
68\tSpring2020\tM\t62.5\t98\t1\tNo
69\tSpring2020\tM\t95\t85\t1\tNo
70\tSpring2020\tM\t95\t95\t1\tNo
71\tSpring2020\tM\t72.5\t95\t1\tNo
72\tSpring2020\tM\t75\t79\t1\tNo
73\tSpring2020\tM\t82.5\t85\t1\tNo
74\tSpring2020\tF\t47.5\t75\t1\tNo
75\tSpring2020\tM\t97.5\t99\t1\tNo
76\tSpring2020\tF\t65\t50\t1\tNo
1\tFall2019\tF\t73.33\t62\t2\tNo
2\tFall2019\tM\t75\t71\t2\tNo
3\tFall2019\tF\t63.33\t60\t2\tNo
4\tFall2019\tF\t96.67\t90\t2\tNo
5\tFall2019\tF\t86.67\t85\t2\tNo
6\tFall2019\tM\t96.67\t93\t2\tNo
7\tFall2019\tM\t70\t80\t2\tNo
8\tFall2019\tM\t86.67\t83\t2\tNo
9\tFall2019\tM\t83.33\t80\t2\tNo
10\tFall2019\tF\t76.67\t80\t2\tNo
11\tFall2019\tM\t80\t79\t2\tNo
12\tFall2019\tF\t76.67\t75\t2\tNo
13\tFall2019\tM\t90\t87\t2\tNo
14\tFall2019\tM\t70\t85\t2\tNo
15\tFall2019\tM\t83.33\t83\t2\tNo
16\tFall2019\tF\t80\t90\t2\tNo
17\tFall2019\tF\t90\t85\t2\tNo
18\tFall2019\tF\t70\t86\t2\tNo
19\tFall2019\tF\t80\t87\t2\tNo
20\tFall2019\tM\t90\t93\t2\tNo
21\tFall2019\tF\t100\t85\t2\tNo
22\tFall2019\tF\t70\t80\t2\tNo
23\tFall2019\tF\t53.33\t75\t2\tNo
24\tFall2019\tM\t76.67\t73\t2\tNo
25\tFall2019\tM\t95\t87\t2\tNo
26\tFall2019\tF\t65\t80\t2\tNo
27\tFall2019\tM\t70\t89\t2\tNo
28\tFall2019\tM\t96.67\t96\t2\tNo
29\tFall2019\tF\t73.33\t47\t2\tNo
30\tFall2019\tM\t91\t90\t2\tNo
31\tFall2019\tM\t50\t80\t2\tNo
32\tFall2019\tF\t76.67\t83\t2\tNo
33\tFall2019\tF\t80\t76\t2\tNo
34\tFall2019\tF\t96.67\t90\t2\tNo
35\tFall2019\tF\t66.67\t77\t2\tNo
36\tFall2019\tM\t80\t90\t2\tNo
37\tFall2019\tM\t80\t75\t2\tNo
38\tFall2019\tM\t86.67\t88\t2\tNo
39\tFall2019\tF\t66.67\t60\t2\tNo
40\tFall2019\tM\t56.67\t74\t2\tNo
41\tFall2019\tF\t76.67\t75\t2\tNo
42\tFall2019\tM\t93.33\t90\t2\tNo
43\tFall2019\tM\t93.33\t97\t2\tNo
44\tSpring2020\tM\t90\t93\t2\tYes
45\tSpring2020\tF\t66.67\t68\t2\tYes
46\tSpring2020\tF\t94.58\t85\t2\tYes
47\tSpring2020\tF\t94.58\t90\t2\tYes
48\tSpring2020\tM\t81.25\t84\t2\tYes
49\tSpring2020\tM\t64.58\t80\t2\tYes
50\tSpring2020\tM\t94.17\t84\t2\tYes
51\tSpring2020\tF\t93.33\t87\t2\tYes
52\tSpring2020\tF\t59.17\t63\t2\tYes
53\tSpring2020\tF\t75.83\t97\t2\tYes
54\tSpring2020\tF\t86.67\t91\t2\tYes
55\tSpring2020\tM\t91.25\t73\t2\tYes
56\tSpring2020\tF\t68.33\t61\t2\tYes
57\tSpring2020\tM\t91.25\t97\t2\tYes
58\tSpring2020\tM\t93.75\t102\t2\tYes
59\tSpring2020\tF\t61.25\t70\t2\tYes
60\tSpring2020\tF\t74.17\t83\t2\tYes
61\tSpring2020\tF\t80.83\t82\t2\tYes
62\tSpring2020\tF\t78.75\t88\t2\tYes
63\tSpring2020\tM\t74.17\t65\t2\tYes
64\tSpring2020\tF\t91.67\t102\t2\tYes
65\tSpring2020\tM\t91.25\t92\t2\tYes
66\tSpring2020\tF\t53.75\t60\t2\tYes
67\tSpring2020\tM\t95.42\t93\t2\tYes
68\tSpring2020\tM\t70.42\t87\t2\tYes
69\tSpring2020\tM\t75.83\t88\t2\tYes
70\tSpring2020\tM\t75.83\t83\t2\tYes
71\tSpring2020\tM\t90\t98\t2\tYes
72\tSpring2020\tM\t62.5\t63\t2\tYes
73\tSpring2020\tM\t81.25\t75\t2\tYes
74\tSpring2020\tF\t89.17\t90\t2\tYes
75\tSpring2020\tM\t79.58\t91\t2\tYes
76\tSpring2020\tF\t61.67\t69\t2\tYes
"""

# Read the data into a pandas DataFrame
df = pd.read_csv(StringIO(data), sep='\t')

# -----------------------------
# Step 2: Calculate Score Difference and Exam-to-Exam Difference
# -----------------------------

# Calculate the Score Difference between predicted and actual scores
df['ScoreDifference'] = df['ExamScore'] - df['ExamPrediction']

# Separate Exam 1 and Exam 2 data
exam1 = df[df['ExamNumber'] == 1].set_index('ID')[['ExamScore']]
exam2 = df[df['ExamNumber'] == 2].set_index('ID')[['ExamScore']]

# Ensure that all IDs have both Exam 1 and Exam 2
common_ids = exam1.index.intersection(exam2.index)
exam1 = exam1.loc[common_ids]
exam2 = exam2.loc[common_ids]

# Calculate Exam 2 - Exam 1 score difference for each student
exam_diff = exam2['ExamScore'] - exam1['ExamScore']
exam_diff = exam_diff.reset_index().rename(columns={'ExamScore': 'ExamDifference'})

# Merge the difference back into the main DataFrame
# Only ExamNumber == 2 rows will have the ExamDifference
df = df.merge(exam_diff, on='ID', how='left')

# -----------------------------
# Step 3: Create New Categorical Variables
# -----------------------------

# Calculate Percentage Difference for prediction accuracy
df['PercentageDifference'] = ((df['ExamPrediction'] - df['ExamScore']) / df['ExamScore']) * 100

# a. AccuratelyEstimated: YES if within ±5%, else NO
df['AccuratelyEstimated'] = df['PercentageDifference'].apply(
    lambda x: 'YES' if -5 <= x <= 5 else 'NO'
)

# b. Overestimated: YES if guessed more than 5% higher than actual score
df['Overestimated'] = df['PercentageDifference'].apply(
    lambda x: 'YES' if x > 5 else 'NO'
)

# c. Underestimated: YES if guessed more than 5% below actual score
df['Underestimated'] = df['PercentageDifference'].apply(
    lambda x: 'YES' if x < -5 else 'NO'
)

# Verify that each record has exactly one 'YES' among the three new variables
df['Sum_YES'] = df[['Overestimated', 'AccuratelyEstimated', 'Underestimated']].apply(
    lambda row: sum([1 if val == 'YES' else 0 for val in row]), axis=1
)

# Check for inconsistencies
inconsistent_records = df[df['Sum_YES'] != 1]

if not inconsistent_records.empty:
    print("Warning: Some records do not have exactly one 'YES' among the new variables.")
    print(inconsistent_records[['ID', 'ExamNumber', 'ScoreDifference', 'PercentageDifference', 'Overestimated', 'AccuratelyEstimated', 'Underestimated']])
else:
    print("All records have exactly one 'YES' among Overestimated, AccuratelyEstimated, and Underestimated.")

# Drop the 'Sum_YES' column as it's no longer needed
df.drop('Sum_YES', axis=1, inplace=True)

# -----------------------------
# Step 4: Export to a New Excel File with Multiple Sheets
# -----------------------------

output_file = 'lastoneEEE.xlsx'

# Create a Pandas Excel writer using openpyxl as the engine
with pd.ExcelWriter(output_file, engine='openpyxl') as writer:
    # Write the main DataFrame to the first sheet
    df.to_excel(writer, sheet_name='All_Exams', index=False)
    
    # -----------------------------
    # Step 5: Create Overestimated Scores Sheet
    # -----------------------------
    
    # Filter only overestimated scores for Exam 2
    overestimated_scores = df[(df['Overestimated'] == 'YES') & (df['ExamNumber'] == 2)][['ExamScore', 'ExamPrediction', 'ExamDifference']]
    
    # Save to a separate sheet without headers and only two columns: ExamScore and ExamPrediction
    overestimated_scores[['ExamScore', 'ExamPrediction']].to_excel(writer, sheet_name='Overestimated_Scores', index=False, header=False)
    
    # -----------------------------
    # Step 6: Create Exam 2 Only Sheet
    # -----------------------------
    
    exam2_only = df[df['ExamNumber'] == 2]
    
    # Save Exam 2 only data to a separate sheet
    exam2_only.to_excel(writer, sheet_name='Exam2_Only', index=False)
    
    print(f"\nData has been processed and saved to '{output_file}' with the following sheets:")
    print("- All_Exams")
    print("- Overestimated_Scores")
    print("- Exam2_Only")

# -----------------------------
# Step 5: Optional - Analyze Impact by COVID Status
# -----------------------------

# Analyze the distribution of the new variables based on 'IsCovid'
impact_analysis = df.groupby(['IsCovid'])[['Overestimated', 'AccuratelyEstimated', 'Underestimated']].apply(
    lambda x: (x == 'YES').sum()
).reset_index()

impact_analysis.rename(columns={
    'Overestimated': 'Overestimated_Count',
    'AccuratelyEstimated': 'AccuratelyEstimated_Count',
    'Underestimated': 'Underestimated_Count'
}, inplace=True)

print("\nImpact Analysis by COVID Status:")
print(impact_analysis)

# Further analysis to identify which gender was most impacted based on Overestimated counts
# Since Overestimated indicates predictions were >5% higher than actual scores (negative impact)
gender_impact = df[df['IsCovid'] == 'Yes'].groupby('Gender')['Overestimated'].apply(lambda x: (x == 'YES').sum()).reset_index()
gender_impact.rename(columns={'Overestimated': 'Overestimated_Count'}, inplace=True)

print("\nNumber of Overestimated (Underperformed) Scores by Gender during COVID:")
print(gender_impact)

# -----------------------------
# Step 6: Add Additional Sheets for Analysis
# -----------------------------

# Overestimated Before COVID (Exam 2 Only)
overestimated_before = df[
    (df['IsCovid'] == 'No') & 
    (df['Overestimated'] == 'YES') & 
    (df['ExamNumber'] == 2)
][['ExamScore', 'ExamPrediction', 'ExamDifference']]

# Overestimated After COVID (Exam 2 Only)
overestimated_after = df[
    (df['IsCovid'] == 'Yes') & 
    (df['Overestimated'] == 'YES') & 
    (df['ExamNumber'] == 2)
][['ExamScore', 'ExamPrediction', 'ExamDifference']]

print("\nNumber of Overestimated Before COVID:", overestimated_before.shape[0])
print("Number of Overestimated After COVID:", overestimated_after.shape[0])

# Append these analyses to separate sheets in the Excel file
with pd.ExcelWriter(output_file, engine='openpyxl', mode='a') as writer:
    impact_analysis.to_excel(writer, sheet_name='Impact_By_Covid', index=False)
    gender_impact.to_excel(writer, sheet_name='Overestimated_By_Gender_Covid', index=False)
    overestimated_before[['ExamScore', 'ExamPrediction', 'ExamDifference']].to_excel(writer, sheet_name='Overestimated_Before_Covid', index=False)
    overestimated_after[['ExamScore', 'ExamPrediction', 'ExamDifference']].to_excel(writer, sheet_name='Overestimated_After_Covid', index=False)

print(f"\nAdditional analysis sheets have been appended to '{output_file}'.")
