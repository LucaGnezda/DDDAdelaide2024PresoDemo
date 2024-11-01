// Concept placeholder ... to replace static definitions if we have time
const presentationDefinition = {
    "backgrounds": [
        {
            "objectId": "dddBackground",
            "contentClass": "DDDPageBackground",
            "pageSlidingRangeX": 1,
            "pageSlidingRangeY": 1
        },
        {
            "objectId": "introBackground",
            "contentClass": "PageBackground",
            "pageSlidingRangeX": 1.6,
            "pageSlidingRangeY": 1
        },
        {
            "objectId": "hubBackground",
            "contentClass": "PageBackground",
            "pageSlidingRangeX": 1,
            "pageSlidingRangeY": 1
        },
        {
            "objectId": "sectionBackground1",
            "contentClass": "PageBackground",
            "pageSlidingRangeX": 3,
            "pageSlidingRangeY": 1
        },
        {
            "objectId": "demoBackground",
            "contentClass": "PageBackground",
            "pageSlidingRangeX": 1,
            "pageSlidingRangeY": 1
        }
    ],
    "contentPages": [
        {
            "objectId": "ddd"
        },
        {
            "objectId": "dddSponsors"
        },
        {
            "objectId": "intro1"
        },
        {
            "objectId": "intro2",
            "primaryAnimation": [
                {
                    add: [
                        { key: "data-line1", classes: ["Show"] },
                    ],
                    remove: [
                        { key: "data-line1", classes: ["Hide"] },
                    ]
                },
                {
                    add: [
                        { key: "data-line2", classes: ["Show"] },
                    ],
                    remove: [
                        { key: "data-line2", classes: ["Hide"] },
                    ]
                },
                {
                    add: [
                        { key: "data-line3", classes: ["Show"] },
                    ],
                    remove: [
                        { key: "data-line3", classes: ["Hide"] },
                    ]
                },
            ],
            "overlayAnimation": [
                {
                    add: [
                        { key: "data-line1", classes: ["Show"] },
                    ],
                    remove: [
                        { key: "data-line1", classes: ["Hide"] },
                    ]
                },
                {
                    add: [
                        { key: "data-line2", classes: ["Show"] },
                    ],
                    remove: [
                        { key: "data-line2", classes: ["Hide"] },
                    ]
                },
                {
                    add: [
                        { key: "data-line3", classes: ["Show"] },
                    ],
                    remove: [
                        { key: "data-line3", classes: ["Hide"] },
                    ]
                },
            ],
        },
        {
            "objectId": "intro3"
        },
        {
            "objectId": "hub"
        },
        {
            "objectId": "logging1"
        },
        {
            "objectId": "components1"
        },
        {
            "objectId": "components2"
        },
        {
            "objectId": "observables1"
        },
        {
            "objectId": "observables2"
        },
        {
            "objectId": "store1"
        },
        {
            "objectId": "store2"
        },
        {
            "objectId": "eventBinding1"
        },
        {
            "objectId": "dispatchActionHandling1"
        },
        {
            "objectId": "dispatchActionHandling2"
        },
        {
            "objectId": "dispatchActionHandling3"
        },
        {
            "objectId": "dataBinding1"
        },
        {
            "objectId": "demo"
        },
    ],
    "pageNodes": [
        {
            "objectId": "ddd",
            "backgroundId": "dddBackground",
            "pageContentId": "ddd",
            "backgroundPagingPosX": 0,
            "backgroundPagingPosY": 0,
            "backgroundTransformer": null
        },
        {
            "objectId": "dddSponsors",
            "backgroundId": "dddBackground",
            "pageContentId": "dddSponsors",
            "backgroundPagingPosX": 0,
            "backgroundPagingPosY": 0,
            "backgroundTransformer": null
        },
        {
            "objectId": "intro1",
            "backgroundId": "introBackground",
            "pageContentId": "intro1",
            "backgroundPagingPosX": 0,
            "backgroundPagingPosY": 0,
            "backgroundTransformer": null
        },
        {
            "objectId": "intro2",
            "backgroundId": "introBackground",
            "pageContentId": "intro2",
            "backgroundPagingPosX": 0.3,
            "backgroundPagingPosY": 0,
            "backgroundTransformer": null
        },
        {
            "objectId": "intro3",
            "backgroundId": "introBackground",
            "pageContentId": "intro2",
            "backgroundPagingPosX": 0.6,
            "backgroundPagingPosY": 0,
            "backgroundTransformer": null
        },
        {
            "objectId": "hub",
            "backgroundId": "hubBackground",
            "pageContentId": "hub",
            "backgroundPagingPosX": 0,
            "backgroundPagingPosY": 0,
            "backgroundTransformer": null
        },
        {
            "objectId": "logging1",
            "backgroundId": "sectionBackground1",
            "pageContentId": "logging1",
            "backgroundPagingPosX": 0,
            "backgroundPagingPosY": 0,
            "backgroundTransformer": null
        },
        {
            "objectId": "components1",
            "backgroundId": "sectionBackground1",
            "pageContentId": "components1",
            "backgroundPagingPosX": 0,
            "backgroundPagingPosY": 0,
            "backgroundTransformer": null
        },
        {
            "objectId": "components2",
            "backgroundId": "sectionBackground1",
            "pageContentId": "components2",
            "backgroundPagingPosX": 0,
            "backgroundPagingPosY": 0.3,
            "backgroundTransformer": null
        },
        {
            "objectId": "observables1",
            "backgroundId": "sectionBackground1",
            "pageContentId": "observables1",
            "backgroundPagingPosX": 0,
            "backgroundPagingPosY": 0,
            "backgroundTransformer": null
        },
        {
            "objectId": "observables2",
            "backgroundId": "sectionBackground1",
            "pageContentId": "observables2",
            "backgroundPagingPosX": 0,
            "backgroundPagingPosY": 0.3,
            "backgroundTransformer": null
        },
        {
            "objectId": "store1",
            "backgroundId": "sectionBackground1",
            "pageContentId": "store1",
            "backgroundPagingPosX": 0,
            "backgroundPagingPosY": 0,
            "backgroundTransformer": null
        },
        {
            "objectId": "store2",
            "backgroundId": "sectionBackground1",
            "pageContentId": "store2",
            "backgroundPagingPosX": 0,
            "backgroundPagingPosY": 0.3,
            "backgroundTransformer": null
        },
        {
            "objectId": "eventBinding1",
            "backgroundId": "sectionBackground1",
            "pageContentId": "eventBinding1",
            "backgroundPagingPosX": 0,
            "backgroundPagingPosY": 0,
            "backgroundTransformer": null
        },
        {
            "objectId": "dispatchActionHandling1",
            "backgroundId": "sectionBackground1",
            "pageContentId": "dispatchActionHandling1",
            "backgroundPagingPosX": 0,
            "backgroundPagingPosY": 0,
            "backgroundTransformer": null
        },
        {
            "objectId": "dispatchActionHandling2",
            "backgroundId": "sectionBackground1",
            "pageContentId": "dispatchActionHandling2",
            "backgroundPagingPosX": 0,
            "backgroundPagingPosY": 0.3,
            "backgroundTransformer": null
        },
        {
            "objectId": "dispatchActionHandling3",
            "backgroundId": "sectionBackground1",
            "pageContentId": "dispatchActionHandling3",
            "backgroundPagingPosX": 0,
            "backgroundPagingPosY": 0.6,
            "backgroundTransformer": null
        },
        {
            "objectId": "dataBinding1",
            "backgroundId": "sectionBackground1",
            "pageContentId": "dataBinding1",
            "backgroundPagingPosX": 0,
            "backgroundPagingPosY": 0,
            "backgroundTransformer": null
        },
        {
            "objectId": "demo",
            "backgroundId": "demoBackground",
            "pageContentId": "demo",
            "backgroundPagingPosX": 0,
            "backgroundPagingPosY": 0,
            "backgroundTransformer": null
        },
    ]
}