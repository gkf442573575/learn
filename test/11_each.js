let a = [
  {
    id: 1,
    name: '22',
    chid: [
      {
        id: 2,
        name: '33'
      },
      {
        id: 5,
        name: '66',
        chid: [
          {
            id: 8,
            name: '4444'
          }
        ]
      }
    ]
  }
];
let b = JSON.parse(JSON.stringify(a).replace('/chid/g', 'children'));
console.log(b);
