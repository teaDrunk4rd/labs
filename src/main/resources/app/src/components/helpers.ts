
export function formatDate(date: string): string {
    return new Date(date).toLocaleString('ru').substr(0,10);
}

export function getGradeBasedClassName (grade: string): string {
    if (['Отлично', 'Хорошо', 'Зачёт'].includes(grade))
        return 'table-success';
    return grade === 'Удовлетворительно' ? 'table-warning' : '';
}

export function checkRole(roles: string): boolean {
    return localStorage["user"] && roles.split(',').includes(JSON.parse(localStorage["user"])["role"]);
}

export function getUserRole(): string {
    return JSON.parse(localStorage["user"]).role;
}

export function getUserName(): string {
    return JSON.parse(localStorage["user"]).name;
}

export function setUserData(name: string, role: string) {
    localStorage['user'] = JSON.stringify({
        name: name,
        role: role
    });
}