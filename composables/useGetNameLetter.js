

export const useGetNameLetter = (name) => {
    
    if (!name) return '';

    const nameParts = name.split(" ");
    const initials = nameParts.map(part => part.charAt(0)).join('');

    return initials;
}