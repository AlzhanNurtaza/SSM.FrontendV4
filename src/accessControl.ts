import { newModel, StringAdapter } from "casbin";

export const model = newModel(`
[request_definition]
r = sub, obj, act

[policy_definition]
p = sub, obj, act, eft

[role_definition]
g = _, _

[policy_effect]
e = some(where (p.eft == allow)) && !some(where (p.eft == deny))

[matchers]
m = g(r.sub, p.sub) && keyMatch(r.obj, p.obj) && regexMatch(r.act, p.act)
`);

export const adapter = new StringAdapter(`
p, Admin, *, list|(list)|(create)|(edit)|(delete)|(show)

p, Editor, department, list
p, Editor, Department, (list)|(create)
p, Editor, Department/*, (edit)|(delete)|(show)

p, Editor, course, list
p, Editor, Course, (list)|(create)
p, Editor, Course/*, (edit)|(delete)|(show)

p, Editor, speciality, list
p, Editor, Speciality, (list)|(create)
p, Editor, Speciality/*, (edit)|(delete)|(show)

p, Editor, group, list
p, Editor, Group, (list)|(create)
p, Editor, Group/*, (edit)|(delete)|(show)

p, Editor, classroom, list
p, Editor, Classroom, (list)|(create)
p, Editor, Classroom/*, (edit)|(delete)|(show)

p, Editor, enrollment, list
p, Editor, Enrollment, (list)|(create)
p, Editor, Enrollment/*, (edit)|(delete)|(show)

p, Editor, userauth, list
p, Editor, UserAuth, (list)|(create)
p, Editor, UserAuth/*, (edit)|(delete)|(show)

p, Editor, homepage, list
p, Editor, homePage, (list)

p, Editor, scheduleview, list
p, Editor, scheduleView, (list)|(create)
p, Editor, scheduleView/*, (edit)|(delete)|(show)

p, Instructor, department, list
p, Instructor, Department, (list)
p, Instructor, Department/*, (show)

p, Instructor, course, list
p, Instructor, Course, (list)
p, Instructor, Course/*, (show)

p, Instructor, speciality, list
p, Instructor, Speciality, (list)
p, Instructor, Speciality/*, (show)

p, Instructor, group, list
p, Instructor, Group, (list)|(create)
p, Instructor, Group/*, (edit)|(delete)|(show)

p, Instructor, classroom, list
p, Instructor, Classroom, (list)
p, Instructor, Classroom/*, (show)

p, Instructor, enrollment, list
p, Instructor, Enrollment, (list)
p, Instructor, Enrollment/*, (show)

p, Instructor, userauth, list
p, Instructor, UserAuth, (list)
p, Instructor, UserAuth/*, (show)

p, Instructor, homepage, list
p, Instructor, homePage, (list)

p, Instructor, scheduleview, list
p, Instructor, scheduleView, (list)
p, Instructor, scheduleView/*, (show)

p, Student, department, list
p, Student, Department, (list)
p, Student, Department/*, (show)

p, Student, course, list
p, Student, Course, (list)
p, Student, Course/*, (show)

p, Student, speciality, list
p, Student, Speciality, (list)
p, Student, Speciality/*, (show)

p, Student, group, list
p, Student, Group, (list)|(create)
p, Student, Group/*, (edit)|(delete)|(show)


p, Student, enrollment, list
p, Student, Enrollment, (list)
p, Student, Enrollment/*, (show)

p, Student, scheduleview, list
p, Student, scheduleView, (list)
p, Student, scheduleView/*, (show)


p, Student, homepage, list
p, Student, homePage, (list)




`);