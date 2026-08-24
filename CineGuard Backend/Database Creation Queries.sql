
Create table Movies
(
Id int primary key identity(1,1),
Name nvarchar(100) not null,
ScriptPath nvarchar(max) not null
)

Create table MovieGuideSections
(
Id int primary key identity(1,1),
MovieId int references Movies(Id) not null,
SectionType int not null check(SectionType between 1 and 5),
SeverityLevel int not null check(SeverityLevel between 1 and 4)
)

Create table MovieGuideItems
(
Id int primary key identity(1,1),
SectionId int references MovieGuideSections(Id) not null,
Description nvarchar(max) not null,
SeverityLevel int not null check(SeverityLevel between 1 and 4)
)