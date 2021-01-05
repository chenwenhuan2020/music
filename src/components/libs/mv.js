function Test(getdoms) {
    let addObj = getdoms.map(
        (item, index) => {
            item.isCollection = false;
            return item;
            /*  */
        }
    );
    return addObj;
}

export {
    Test
};