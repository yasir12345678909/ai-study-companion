BOARDS = [
    {"id":"fbise","name":"Federal Board of Intermediate and Secondary Education (Islamabad)","short_name":"Federal Board (FBISE)","province":"Federal Capital / Islamabad"},
    {"id":"bise-lahore","name":"Board of Intermediate and Secondary Education, Lahore","short_name":"Punjab Board (BISE Lahore)","province":"Punjab"},
    {"id":"bise-rawalpindi","name":"Board of Intermediate and Secondary Education, Rawalpindi","short_name":"Punjab Board (BISE Rawalpindi)","province":"Punjab"},
    {"id":"biek-karachi","name":"Board of Intermediate Education, Karachi","short_name":"Sindh Board (BIEK / BSEK)","province":"Sindh"},
    {"id":"bise-peshawar","name":"Board of Intermediate and Secondary Education, Peshawar","short_name":"KPK Board (BISE Peshawar)","province":"Khyber Pakhtunkhwa"},
]
SSC=[
 {"id":"eng-ssc","name":"English Compulsory","code":"ENG-I","is_compulsory":True},{"id":"urdu-ssc","name":"Urdu Compulsory","code":"URDU-I","is_compulsory":True},{"id":"isl-ssc","name":"Islamiat / Ethics","code":"ISL-I","is_compulsory":True},{"id":"pst-ssc","name":"Pakistan Studies","code":"PST-I","is_compulsory":True}]
HSSC=[
 {"id":"eng-hssc","name":"English Compulsory","code":"ENG-II","is_compulsory":True},{"id":"urdu-hssc","name":"Urdu Compulsory","code":"URDU-II","is_compulsory":True},{"id":"isl-hssc","name":"Islamic Education / Civics","code":"ISL-II","is_compulsory":True},{"id":"pst-hssc","name":"Pakistan Studies","code":"PST-II","is_compulsory":True}]
def sub(id,name,code): return {"id":id,"name":name,"code":code,"is_compulsory":False}
SSC_STREAMS=[
 {"id":"sci-bio","name":"Science (Biology Group)","code":"BIO","description":"Pre-medical pathway covering biological sciences, physics, chemistry and math.","combinations":[{"id":"ssc-bio-std","name":"Standard Science with Biology","description":"Physics, Chemistry, Biology, and Mathematics","subjects":SSC+[sub("phy","Physics","PHY"),sub("chem","Chemistry","CHEM"),sub("bio","Biology","BIO"),sub("math","Mathematics","MATH")]}]},
 {"id":"sci-cs","name":"Science (Computer Science Group)","code":"CS","description":"Pre-engineering/computing pathway with computer science instead of biology.","combinations":[{"id":"ssc-cs-std","name":"Standard Science with Computer Studies","description":"Physics, Chemistry, Computer Science, and Mathematics","subjects":SSC+[sub("phy","Physics","PHY"),sub("chem","Chemistry","CHEM"),sub("cs","Computer Science","CS"),sub("math","Mathematics","MATH")]}]},
 {"id":"arts-general","name":"Humanities & General Group","code":"ARTS","description":"General matriculation with general mathematics and elective arts subjects.","combinations":[{"id":"ssc-arts-std","name":"General Group with General Science","description":"General Science, General Math, Education, and Civics","subjects":SSC+[sub("gen-sci","General Science","G-SCI"),sub("gen-math","General Mathematics","G-MATH"),sub("edu","Education","EDU"),sub("civ","Civics","CIV")]}]},
]
HSSC_STREAMS=[
 {"id":"fsc-pre-med","name":"F.Sc. Pre-Medical","code":"PRE-MED","description":"Specialized for medicine, biotechnology, and health sciences.","combinations":[{"id":"hssc-pre-med-std","name":"Standard Pre-Medical Trio","description":"Physics, Chemistry, and Biology","subjects":HSSC+[sub("phy","Physics","PHY"),sub("chem","Chemistry","CHEM"),sub("bio","Biology","BIO")]}]},
 {"id":"fsc-pre-eng","name":"F.Sc. Pre-Engineering","code":"PRE-ENG","description":"Specialized for engineering, mathematics, architecture, and physical sciences.","combinations":[{"id":"hssc-pre-eng-std","name":"Standard Pre-Engineering Trio","description":"Physics, Chemistry, and Mathematics","subjects":HSSC+[sub("phy","Physics","PHY"),sub("chem","Chemistry","CHEM"),sub("math","Mathematics","MATH")]}]},
 {"id":"ics","name":"I.C.S. (Computer Science)","code":"ICS","description":"Intermediate in Computer Science with multiple board-recognized elective combinations.","combinations":[
  {"id":"ics-physics","name":"ICS (Physics Group)","description":"Mathematics, Computer Science, and Physics (ideal for Software Engineering/Tech)","subjects":HSSC+[sub("math","Mathematics","MATH"),sub("cs","Computer Science","CS"),sub("phy","Physics","PHY")]},
  {"id":"ics-stats","name":"ICS (Statistics Group)","description":"Mathematics, Computer Science, and Statistics (ideal for Data Science/Analytics)","subjects":HSSC+[sub("math","Mathematics","MATH"),sub("cs","Computer Science","CS"),sub("stat","Statistics","STAT")]},
  {"id":"ics-econ","name":"ICS (Economics Group)","description":"Mathematics, Computer Science, and Economics (ideal for FinTech/Business Computing)","subjects":HSSC+[sub("math","Mathematics","MATH"),sub("cs","Computer Science","CS"),sub("econ","Economics","ECON")]},
 ]},
 {"id":"icom","name":"I.Com. (Commerce)","code":"ICOM","description":"Specialized for accounting, business administration, and banking.","combinations":[{"id":"icom-std","name":"Standard Commerce Group","description":"Principles of Accounting, Principles of Economics, and Commercial Geography","subjects":HSSC+[sub("acc","Principles of Accounting","ACC"),sub("econ","Principles of Economics","ECON"),sub("comm-geo","Commercial Geography","C-GEO")]}]},
 {"id":"fa-humanities","name":"F.A. (Humanities & Arts)","code":"FA","description":"Humanities subjects including Civics, History, Islamic Studies and Sociology.","combinations":[{"id":"fa-general","name":"Civics, Islamic Studies & Education","description":"Civics, Advanced Islamic Studies, and Education","subjects":HSSC+[sub("civ","Civics","CIV"),sub("isl-adv","Islamic Studies (Elective)","ISL-E"),sub("edu","Education","EDU")]}]},
]

def curriculum_rows():
    for board in BOARDS:
        yield board, list(range(9,13)), SSC_STREAMS, HSSC_STREAMS
