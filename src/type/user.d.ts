export interface UserType {
    collegeId: number,
    collegeName: string,
    logoUrl: string,
    major: string,
    gpa: number,
    studentName: string,
    userStatus: number,
    language: string,
    auth: number,
}

export interface UserLoginType {
    name: string;
    password: string;
  }