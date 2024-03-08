function convertDigitToString(num) {
    if (num >= 10) return num.toString();
    return `0${num}`;
} 

export default function () {
    const now = new Date();
    const year = now.getFullYear();
    const month = convertDigitToString(now.getMonth() + 1);
    const day = convertDigitToString(now.getDate());
    return `${year}${month}${day}`;
}
