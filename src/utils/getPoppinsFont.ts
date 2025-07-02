export const getPoppinsFont = (fontWeight: number, isItalic: boolean) => {
    switch(fontWeight){
        case 100:
            return isItalic ? 'Poppins-ThinItalic' : 'Poppins-Thin';
        case 200:
            return isItalic ? 'Poppins-ExtraLightItalic' : 'Poppins-ExtraLight';
        case 300:
            return isItalic ? 'Poppins-LightItalic' : 'Poppins-Light';
        case 400:
            return isItalic ? 'Poppins-Italic' : 'Poppins-Regular';
        case 500:
            return isItalic ? 'Poppins-MediumItalic' : 'Poppins-Medium';
        case 600:
            return isItalic ? 'Poppins-SemiBoldItalic' : 'Poppins-SemiBold';
        case 700:
            return isItalic ? 'Poppins-BoldItalic' : 'Poppins-Bold';
        case 800:
            return isItalic ? 'Poppins-ExtraBoldItalic' : 'Poppins-ExtraBold';
        default:
            return 'Poppins-Regular';
    }
}