var manymes = window.manymes || {};

/**
 * Avatar JSON
 * @type {Array}
 *
 * frame starts on value 0, first image of a sprite is frame 0
 * spriteLength: 2 different images call for a spriteLength of 2
 */
manymes.avatars = [
    {
        'name': 'bayern',
        'id': 'bayern',
        'spriteLength': 4,
        'animation': [
            { 'frame': 1, 'duration': 100 },
            { 'frame': 0, 'duration': 200 },
            { 'frame': 2, 'duration': 200 },
            { 'frame': 3, 'duration': 200 },
            { 'frame': 2, 'duration': 200 },
            { 'frame': 0, 'duration': 1000 },
            { 'frame': 2, 'duration': 200 },
            { 'frame': 3, 'duration': 200 },
            { 'frame': 2, 'duration': 200 }
        ]
    },
    {
        'name': 'feuerwehr',
        'id': 'feuerwehr',
        'spriteLength': 5,
        'animation': [
            { 'frame': 0, 'duration': 800 },
            { 'frame': 2, 'duration': 150 },
            { 'frame': 3, 'duration': 150 },
            { 'frame': 4, 'duration': 150 },
            { 'frame': 0, 'duration': 800 },
            { 'frame': 2, 'duration': 150 },
            { 'frame': 3, 'duration': 150 },
            { 'frame': 4, 'duration': 150 },
            { 'frame': 0, 'duration': 800 },
            { 'frame': 1, 'duration': 100 },
        ]
    },
    {
        'name': 'computer',
        'id': 'computer',
        'spriteLength': 3,
        'animation': [
            { 'frame': 0, 'duration': 300 },
            { 'frame': 2, 'duration': 200 },
            { 'frame': 0, 'duration': 200 },
            { 'frame': 1, 'duration': 10 },
            { 'frame': 0, 'duration': 200 },
            { 'frame': 2, 'duration': 100 },
            { 'frame': 0, 'duration': 100 },
            { 'frame': 1, 'duration': 80 },
            { 'frame': 1, 'duration': 10 },
            { 'frame': 0, 'duration': 100 },
            { 'frame': 2, 'duration': 100 },
            { 'frame': 0, 'duration': 50 },
            { 'frame': 2, 'duration': 150 }
        ]
    },
    {
        'name': 'maler',
        'id': 'maler',
        'spriteLength': 4,
        'animation': [
            { 'frame': 0, 'duration': 1000 },
            { 'frame': 0, 'duration': 1000 },
            { 'frame': 0, 'duration': 1000 },
            { 'frame': 0, 'duration': 1000 }
        ]
    },
    {
        'name': 'maler2',
        'id': 'maler2',
        'spriteLength': 4,
        'animation': [
            { 'frame': 0, 'duration': 1000 },
            { 'frame': 0, 'duration': 1000 },
            { 'frame': 0, 'duration': 1000 },
            { 'frame': 0, 'duration': 1000 }
        ]
    },
    {
        'name': 'maler3',
        'id': 'maler3',
        'spriteLength': 4,
        'animation': [
            { 'frame': 0, 'duration': 1000 },
            { 'frame': 0, 'duration': 1000 },
            { 'frame': 0, 'duration': 1000 },
            { 'frame': 0, 'duration': 1000 }
        ]
    }
];