
export function autoIdGenerater({schoolName, role , lastIdNumber}){
    const schoolNameParts = schoolName.split(' ');
    const schoolInitials = schoolNameParts.map(part => part.charAt(0).toUpperCase()).join('');
    let idNumber;
    if (lastIdNumber < 9999){
        idNumber = String(lastIdNumber + 1).padStart(4, '0'); // Now supports up to 9999
    } else {
        idNumber =lastIdNumber + 1 ; 
    }
  

    return `${schoolInitials}-${roleToPrefix(role)}-${idNumber}`;

}



function roleToPrefix(role) {
    switch (role) {
        case 'student':
            return 'STU';
        case 'teacher':
            return 'TEA';
        case 'admin':
            return 'ADM';
        default:
            return 'UNK'; // Unknown role     
    }
}

console.log(autoIdGenerater({schoolName: 'Greenwood High', role: 'student', lastIdNumber: 9})); // Output: GH-STU-101