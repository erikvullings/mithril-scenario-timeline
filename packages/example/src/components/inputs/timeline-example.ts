export const timeline = [
  {
    id: 'id_d7fc49db',
    title: 'Test',
    isOpen: true,
    delay: 0,
  },
  {
    id: 'id_d04dd7b2',
    title: 'Initialisation',
    parentId: 'id_d7fc49db',
    isOpen: true,
    delay: 0,
    dependsOn: [
      {
        id: 'id_d7fc49db',
        condition: 'started',
      },
    ],
  },
  {
    id: 'id_3d07c648',
    title: 'Session',
    parentId: 'id_d04dd7b2',
    isOpen: true,
    delay: 0,
    dependsOn: [
      {
        id: 'id_d04dd7b2',
        condition: 'started',
      },
    ],
  },
  {
    id: 'id_112fc69b',
    title: 'START INITIALIZATION',
    parentId: 'id_3d07c648',
    delay: 0,
    dependsOn: [
      {
        id: 'id_3d07c648',
        condition: 'started',
      },
    ],
  },
  {
    id: 'id_2a38cef5',
    title: 'Block 1 OST initialisation',
    parentId: 'id_3d07c648',
    delay: 0,
    dependsOn: [
      {
        id: 'id_112fc69b',
        condition: 'finished',
      },
    ],
  },
  {
    id: 'id_f9405ca4',
    title: 'Situatiebeeld',
    parentId: 'id_3d07c648',
    delay: 8,
    dependsOn: [
      {
        id: 'id_3d07c648',
        condition: 'started',
      },
    ],
  },
  {
    id: 'id_b18cb750',
    title: 'Intro block 2',
    parentId: 'id_3d07c648',
    delay: 0,
    dependsOn: [
      {
        id: 'id_2a38cef5',
        condition: 'started',
      },
    ],
  },
  {
    id: 'id_58a80f4d',
    title: 'LCMS init msg',
    parentId: 'id_3d07c648',
    delay: 11,
    dependsOn: [
      {
        id: 'id_b18cb750',
        condition: 'finished',
      },
    ],
  },
  {
    id: 'd123c94c-c98a-48b6-8be5-2f7a8c5a0a3a',
    title: 'Run inject START_X',
    parentId: 'id_3d07c648',
    delay: 0,
    dependsOn: [
      {
        id: 'id_58a80f4d',
        condition: 'finished',
      },
    ],
  },
  {
    id: '30b48b1d-f5f4-4101-bc22-c5368d0b9074',
    title: 'Run Rotterdam/data/osm.sumocfg',
    parentId: 'id_3d07c648',
    delay: 0,
    dependsOn: [
      {
        id: 'id_112fc69b',
        condition: 'finished',
      },
    ],
  },
  {
    id: 'cc0dabe9-a6f6-445b-85e4-ce78d5ec08d5',
    title: 'Rotterdam affected area',
    parentId: 'id_3d07c648',
    delay: 0,
    dependsOn: [
      {
        id: '30b48b1d-f5f4-4101-bc22-c5368d0b9074',
        condition: 'started',
      },
    ],
  },
  {
    id: 'cfe5bf2a-3efb-41ef-ac2e-30edab644b4d',
    title: 'Send vehicle1 to Rotterdam CS',
    parentId: 'id_3d07c648',
    delay: 0,
    dependsOn: [
      {
        id: 'cc0dabe9-a6f6-445b-85e4-ce78d5ec08d5',
        condition: 'started',
      },
    ],
  },
  {
    id: 'id_33fa27a2',
    title: 'END INITIALIZATION',
    parentId: 'id_3d07c648',
    delay: 0,
    dependsOn: [
      {
        id: 'd123c94c-c98a-48b6-8be5-2f7a8c5a0a3a',
        condition: 'finished',
      },
    ],
  },
];
