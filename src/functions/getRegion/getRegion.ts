import { regs } from './regPostWrap'
const regCodeMap = new Map();
regs.forEach((obj: {}) => {
    const [[key,value]] = Object.entries(obj);
    regCodeMap.set(value, key);
})
export const getRegion = (address: string) => {
    const zipCodeReg = /\b\d{6}/;
    const [zipCode] = address.match(zipCodeReg) || []
    if (!zipCode) return null
    const regCode = Math.floor(+zipCode / 1000);
    return regCodeMap.get(regCode) || null
}
