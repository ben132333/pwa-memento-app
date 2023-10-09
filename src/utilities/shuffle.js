const assets = [
    {'image': './assets/css.png'},
    {'image': './assets/html5.png'},
    {'image': './assets/jquery.png'},
    {'image': './assets/js.png'},
    {'image': './assets/next.png'},
    {'image': './assets/node.png'},
    {'image': './assets/react.png'},
    {'image': './assets/ts.png'},
];

const shuffle = () => {
    let array = [...assets, ...assets];
    array = array.sort(() => Math.random() - 0.5)
    .map((card) => ({ ...card, id:Math.random() }))

    return array;
}

export default shuffle;