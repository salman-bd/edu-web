
export interface ProfileType {
    _id: string
    firstName: string
    lastName: string
    email: string
    phone: string
    dateOfBirth: string
    address: string
    programType: string
    subjectSpecialization: string
    photoUrl: string
    isAffiliated: string
    type: string
    fullName: string
    createdAt?: string
}

export interface TeacherProfileType {
    id: string
    firstName: string
    lastName: string
    email: string
    phone: string
    dateOfBirth: string
    address: string
    highestDegree?: string
    university?: string
    yearsOfExperience?: string
    subjectSpecialization?: string
    teachingLevel?: string[]
    coverLetter?: string
    photoUrl: string
    isAffiliated: string
    type: string
    fullName: string
    createdAt?: string
}

export interface StudentProfileType {
    id: string
    firstName: string
    lastName: string
    email: string
    phone: string
    dateOfBirth: string
    gender?: string
    institutionName?: string
    address: string
    zipCode?: string
    city?: string
    state?: string
    programLevel?: string
    programType?: string
    previousSchool?: string
    personalStatement?: string
    photoUrl: string
    isAffiliated: string
    type: string
    fullName: string
    createdAt?: string
}
