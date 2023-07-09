
export const useDaysOnMounth = () => {
    const year =new Date().getFullYear()
    const mounth = new Date().getMonth()
    const date1 = new Date( year, mounth, 1);
    const date2 = new Date( year, mounth+1, 1);
    const date3 = Math.round((date2 - date1) / 1000 / 3600 / 24);
    return date3
};

