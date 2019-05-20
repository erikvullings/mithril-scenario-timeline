export const timeline = [
  {
    title: 'Test',
    type: 'SCENARIO',
    id: 'id_d7fc49db',
    startDate: 'Mon, 08 Apr 2019 06:00:00 GMT',
    endDate: 'Mon, 08 Apr 2019 09:00:00 GMT',
    isOpen: true,
    isValid: 'valid',
    mainObjectiveId: 'c567ab70-67c3-4a2f-8514-96b251d71b84',
    delay: 0,
  },
  {
    title: 'Initialisation',
    type: 'STORYLINE',
    parentId: 'id_d7fc49db',
    id: 'id_d04dd7b2',
    condition: {
      type: 'IMMEDIATELY',
      delay: 0,
      delayUnitType: 'seconds',
      injectState: 'IN_PROGRESS',
      injectId: 'id_d7fc49db',
    },
    isOpen: true,
    isValid: 'valid',
    delay: 0,
    dependsOn: [
      {
        id: 'id_d7fc49db',
        condition: 'started',
      },
    ],
  },
  {
    title: 'Session',
    type: 'ACT',
    parentId: 'id_d04dd7b2',
    id: 'id_3d07c648',
    condition: {
      type: 'IMMEDIATELY',
      delay: 0,
      delayUnitType: 'seconds',
      injectState: 'IN_PROGRESS',
      injectId: 'id_d04dd7b2',
    },
    isOpen: true,
    isValid: 'valid',
    delay: 0,
    dependsOn: [
      {
        id: 'id_d04dd7b2',
        condition: 'started',
      },
    ],
  },
  {
    title: 'Second act',
    type: 'ACT',
    parentId: 'id_d04dd7b2',
    id: '0eec38da-4d9f-48c3-9724-549ed5e3b71c',
    isValid: 'valid',
    condition: {
      type: 'IMMEDIATELY',
      delay: 0,
      delayUnitType: 'seconds',
      injectState: 'EXECUTED',
      injectId: 'id_3d07c648',
    },
    isOpen: true,
    delay: 0,
    dependsOn: [
      {
        id: 'id_3d07c648',
        condition: 'finished',
      },
    ],
  },
  {
    title: 'START INITIALIZATION',
    type: 'INJECT',
    parentId: 'id_3d07c648',
    id: 'id_112fc69b',
    condition: {
      type: 'IMMEDIATELY',
      delay: 0,
      delayUnitType: 'seconds',
      injectState: 'IN_PROGRESS',
      injectId: 'id_3d07c648',
    },
    messageType: 1,
    message: {
      PHASE_MESSAGE: {
        id: 'id_112fc69b',
        phase: 'INITIALIZATION',
        isStarting: true,
      },
    },
    description: 'Starting with block 1, a few days before the flooding.',
    isValid: 'valid',
    delay: 0,
    dependsOn: [
      {
        id: 'id_3d07c648',
        condition: 'started',
      },
    ],
  },
  {
    title: 'Block 1 OST initialisation',
    type: 'INJECT',
    parentId: 'id_3d07c648',
    id: 'id_2a38cef5',
    condition: {
      type: 'IMMEDIATELY',
      delay: 0,
      delayUnitType: 'seconds',
      injectState: 'EXECUTED',
      injectId: 'id_112fc69b',
    },
    messageType: 4,
    message: {
      CHANGE_OBSERVER_QUESTIONNAIRES: {
        id: 'id_2a38cef5',
        ostTrialSessionId: 1,
        ostTrialStageId: 1,
      },
    },
    description: 'Quick questions',
    isValid: 'valid',
    delay: 0,
    dependsOn: [
      {
        id: 'id_112fc69b',
        condition: 'finished',
      },
    ],
  },
  {
    title: 'Intro block 2',
    type: 'INJECT',
    parentId: 'id_3d07c648',
    id: 'id_b18cb750',
    condition: {
      type: 'IMMEDIATELY',
      delay: 0,
      delayUnitType: 'seconds',
      injectState: 'IN_PROGRESS',
      injectId: 'id_2a38cef5',
    },
    messageType: 6,
    message: {
      CAP_MESSAGE: {
        id: 'id_b18cb750',
        identifier: 'id_b18cb750',
        status: 'Exercise',
        msgType: 'Alert',
        scope: 'Public',
        info: {
          event: 'Monitor',
          parameter: [
            {
              valueName: 'Incident',
              value:
                '- Op woensdagavond 22 mei 2019 zal een NW storm ten noorden van Nederland overtrekken.\n- De kust zal naar verwachting flink te lijden hebben van harde wind en veel regen.\n- Woensdagavond is het ook springtij, waardoor waterstanden hoger zullen zijn dan normaal.\n- De combinatie van storm, regen en springtij kan ertoe leiden dat kunstwerken het begeven. Gevolg hiervan zou kunnen zijn dan Den Haag gedeeltelijk overstroomt.',
            },
            {
              valueName: 'Veiligheid',
              value: '- Er is een kans dat delen van Den Haag zullen overstromen: centrum en Wateringseveld',
            },
            {
              valueName: 'Meteo',
              value:
                '# Huidig\n\n- Windrichting: 274 graden\n- 6 Bft (40-50 km/h; 11-14 m/s)\n- Bewolkingsgraad: 4/8 (halfbewolkt)\n- Droog\n- Luchtvochtigheid: 80%\n\n# Voorspelling avond 22 mei 2019\n\n- NW storm\n- Windrichting 320 graden\n- 10 Bft (90-100 km/h; 24-28 m/s)\n- Bewolkingsgraad: 8/8 (geheel bewolkt)\n- Zware regenval\n- Luchtvochtigheid: 90%',
            },
            {
              valueName: 'Slachtoffers/bevolking',
              value: ' ',
            },
            {
              valueName: 'Omgeving/effecten',
              value:
                '- Een meer gedetailleerde voorspelling van het waterschap toont aan dat delen van Den Haag overstromen wanneer de uitwateringssluis van Scheveningen het begeeft.',
            },
            {
              valueName: 'Communicatie',
              value:
                '- Communicatie zal plaatsvinden door de gemeente, in overleg met de Veiligheidsregio Haaglanden (woordvoerder brandweer).',
            },
            {
              valueName: 'Betrokken diensten',
              value:
                '- Brandweer\n- Politie\n- GHOR\n- Gemeente Den Haag\n- Waterschap\n- Stedin\n- HTM\n- Internationale organisaties',
            },
            {
              valueName: 'Ontbrekende informatie',
              value:
                '- Als overstroming plaatsvindt:\n  - Potentieel te ontruimen gebied\n  - Kwetsbare objecten in overstromingsgebied\n  - Gevolgen voor vitale infrastructuur\n  - Gevolgen voor hulpverlening\n- Mogelijkheden m.b.t. evacuatie van Den Haag Centrum voordat de storm aan land komt.\n  - Voor- en nadelen van verschillende mogelijkheden',
            },
          ],
          headline: 'Intro block 2',
          senderName: 'ROT',
          severity: 'Severe',
          certainty: 'Likely',
          category: ['Safety', 'Env', 'Rescue'],
          urgency: 'Expected',
        },
        sender: 'rot@tmt.eu',
      },
    },
    isValid: 'valid',
    delay: 0,
    dependsOn: [
      {
        id: 'id_2a38cef5',
        condition: 'started',
      },
    ],
  },
  {
    title: 'Run inject X',
    type: 'INJECT',
    parentId: 'id_3d07c648',
    id: 'd123c94c-c98a-48b6-8be5-2f7a8c5a0a3a',
    condition: {
      type: 'IMMEDIATELY',
      delay: 0,
      delayUnitType: 'seconds',
      injectState: 'IN_PROGRESS',
      injectId: 'id_112fc69b',
    },
    messageType: 7,
    message: {
      START_INJECT: {
        id: 'd123c94c-c98a-48b6-8be5-2f7a8c5a0a3a',
        guid: 'd123c94c-c98a-48b6-8be5-2f7a8c5a0a3a',
        owner: 'TB_TrialMgmt',
        inject: 'X',
      },
    },
    description: 'Great',
    isValid: 'valid',
    delay: 0,
    dependsOn: [
      {
        id: 'id_112fc69b',
        condition: 'started',
      },
    ],
  },
  {
    title: 'Run Rotterdam/data/osm.sumocfg',
    type: 'INJECT',
    parentId: 'id_3d07c648',
    id: '30b48b1d-f5f4-4101-bc22-c5368d0b9074',
    condition: {
      type: 'MANUALLY',
      delay: 0,
      delayUnitType: 'seconds',
      injectState: 'EXECUTED',
      injectId: 'id_112fc69b',
    },
    messageType: 10,
    message: {
      SUMO_CONFIGURATION: {
        id: '30b48b1d-f5f4-4101-bc22-c5368d0b9074',
        begin: -1,
        end: -1,
        aggregation: 3600000,
        affectedTraffic: 90000,
        singleVehicle: -1,
        configFile: 'Rotterdam/data/osm.sumocfg',
      },
    },
    description: 'Simulates vehicle traffic near the Rotterdam train station.',
    isValid: 'valid',
    delay: 0,
    dependsOn: [
      {
        id: 'id_112fc69b',
        condition: 'finished',
      },
    ],
  },
  {
    title: 'Rotterdam affected area',
    type: 'INJECT',
    parentId: 'id_3d07c648',
    id: 'cc0dabe9-a6f6-445b-85e4-ce78d5ec08d5',
    condition: {
      type: 'IMMEDIATELY',
      delay: 0,
      delayUnitType: 'seconds',
      injectState: 'IN_PROGRESS',
      injectId: '30b48b1d-f5f4-4101-bc22-c5368d0b9074',
    },
    messageType: 9,
    message: {
      SET_AFFECTED_AREA: {
        id: 'cc0dabe9-a6f6-445b-85e4-ce78d5ec08d5',
        begin: -1,
        end: -1,
        restriction: 'all',
        area: {
          type: 'MultiPolygon',
          coordinates: [
            [
              [
                [4.48307, 51.911835],
                [4.464999, 51.919835],
                [4.46721, 51.924023],
                [4.48368, 51.920165],
                [4.48307, 51.911835],
              ],
            ],
          ],
        },
      },
    },
    description: 'Due to heavy rain, some areas are inaccessible by traffic.',
    isValid: 'valid',
    delay: 0,
    dependsOn: [
      {
        id: '30b48b1d-f5f4-4101-bc22-c5368d0b9074',
        condition: 'started',
      },
    ],
  },
  {
    title: 'Send vehicle1 to Rotterdam CS',
    type: 'INJECT',
    parentId: 'id_3d07c648',
    id: 'cfe5bf2a-3efb-41ef-ac2e-30edab644b4d',
    condition: {
      type: 'IMMEDIATELY',
      delay: 0,
      delayUnitType: 'seconds',
      injectState: 'IN_PROGRESS',
      injectId: 'cc0dabe9-a6f6-445b-85e4-ce78d5ec08d5',
    },
    messageType: 8,
    message: {
      REQUEST_UNIT_TRANSPORT: {
        id: 'cfe5bf2a-3efb-41ef-ac2e-30edab644b4d',
        guid: 'cfe5bf2a-3efb-41ef-ac2e-30edab644b4d',
        owner: 'TB_TrialMgmt',
        route: [
          {
            longitude: 4.467462,
            latitude: 51.910855,
          },
          {
            longitude: 4.463802,
            latitude: 51.921679,
          },
        ],
      },
    },
    isValid: 'valid',
    delay: 0,
    dependsOn: [
      {
        id: 'cc0dabe9-a6f6-445b-85e4-ce78d5ec08d5',
        condition: 'started',
      },
    ],
  },
  {
    title: 'Situatiebeeld',
    type: 'INJECT',
    parentId: 'id_3d07c648',
    id: 'id_f9405ca4',
    condition: {
      type: 'DELAY',
      delay: 2,
      delayUnitType: 'seconds',
      injectState: 'IN_PROGRESS',
      injectId: 'id_3d07c648',
    },
    messageType: 6,
    message: {
      CAP_MESSAGE: {
        id: 'id_f9405ca4',
        identifier: 'id_f9405ca4',
        status: 'Exercise',
        msgType: 'Alert',
        scope: 'Public',
        info: {
          event: 'Monitor',
          parameter: [
            {
              valueName: 'heading 1',
              value: 'Dit is heading 1',
            },
            {
              valueName: 'heading 2',
              value: 'Dit is heading 2',
            },
            {
              valueName: '_actions',
              value:
                '[{"title":"Help","description":"Me","priority":"High"},{"title":"More","description":"Help is needed","priority":"Normal"}]',
            },
          ],
          headline: 'Situatiebeeld',
          senderName: 'Action list',
          urgency: 'Expected',
          severity: 'Moderate',
          certainty: 'Likely',
          category: ['Fire', 'Env', 'Security'],
        },
        sender: 'action@tmt.eu',
      },
    },
    isValid: 'valid',
    delay: 2,
    dependsOn: [
      {
        id: 'id_3d07c648',
        condition: 'started',
      },
    ],
  },
  {
    title: 'Testje',
    type: 'INJECT',
    parentId: 'id_3d07c648',
    id: '274a73cd-ab85-4b81-a03e-e119d1772c0c',
    isValid: 'valid',
    condition: {
      type: 'MANUALLY',
      delay: 10,
      delayUnitType: 'seconds',
      injectState: 'IN_PROGRESS',
      injectId: 'id_3d07c648',
    },
    messageType: 0,
    message: {
      ROLE_PLAYER_MESSAGE: {
        id: '274a73cd-ab85-4b81-a03e-e119d1772c0c',
        rolePlayerId: 'id_a504b700',
        type: 'ACTION',
        title: 'Testje',
      },
    },
    delay: 10,
    dependsOn: [
      {
        id: 'id_3d07c648',
        condition: 'started',
      },
    ],
  },
  {
    title: 'Testje 2',
    type: 'INJECT',
    parentId: 'id_3d07c648',
    id: 'aecf649a-0616-44a2-9ad7-ef3a0e9aad2b',
    isValid: 'valid',
    condition: {
      type: 'MANUALLY',
      delay: 20,
      delayUnitType: 'seconds',
      injectState: 'EXECUTED',
      injectId: '274a73cd-ab85-4b81-a03e-e119d1772c0c',
    },
    messageType: 0,
    message: {
      ROLE_PLAYER_MESSAGE: {
        id: 'aecf649a-0616-44a2-9ad7-ef3a0e9aad2b',
        rolePlayerId: 'id_a504b700',
        type: 'ACTION',
        title: 'Testje 2',
      },
    },
    delay: 20,
    dependsOn: [
      {
        id: '274a73cd-ab85-4b81-a03e-e119d1772c0c',
        condition: 'finished',
      },
    ],
  },
  {
    title: 'END INITIALIZATION',
    type: 'INJECT',
    parentId: 'id_3d07c648',
    id: 'id_33fa27a2',
    condition: {
      type: 'IMMEDIATELY',
      delay: 0,
      delayUnitType: 'seconds',
      injectState: 'EXECUTED',
      injectId: 'aecf649a-0616-44a2-9ad7-ef3a0e9aad2b',
    },
    messageType: 1,
    message: {
      PHASE_MESSAGE: {
        id: 'id_33fa27a2',
        phase: 'INITIALIZATION',
        isStarting: false,
      },
    },
    description: 'All messages have been sent.',
    isValid: 'valid',
    delay: 0,
    dependsOn: [
      {
        id: 'aecf649a-0616-44a2-9ad7-ef3a0e9aad2b',
        condition: 'finished',
      },
    ],
  },
  {
    title: 'Testje 3',
    type: 'INJECT',
    parentId: '0eec38da-4d9f-48c3-9724-549ed5e3b71c',
    id: 'bb20546a-a199-4e90-82d0-9fdf443fefee',
    isValid: 'valid',
    condition: {
      type: 'MANUALLY',
      delay: 30,
      delayUnitType: 'seconds',
      injectState: 'IN_PROGRESS',
      injectId: '0eec38da-4d9f-48c3-9724-549ed5e3b71c',
    },
    messageType: 0,
    message: {
      ROLE_PLAYER_MESSAGE: {
        id: 'bb20546a-a199-4e90-82d0-9fdf443fefee',
        rolePlayerId: 'id_a504b700',
        type: 'ACTION',
        title: 'Testje 3',
      },
    },
    delay: 30,
    dependsOn: [
      {
        id: '0eec38da-4d9f-48c3-9724-549ed5e3b71c',
        condition: 'started',
      },
    ],
  },
];

export const timeline2 = [
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
