import {atom} from 'recoil';

export const statusAtom = atom({
    key:"status",
    default: "pending"
})