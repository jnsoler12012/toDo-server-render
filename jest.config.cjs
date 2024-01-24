/** @type {import('jest').Config} */

module.exports = {
    "testEnvironment": "node",
    "transform": {
        "\\.[jt]sx?$": "babel-jest",
    },
    testMatch: [
        '<rootDir>/__test__/**/*.(test|spec).(js)',
    ],
    allowJs: true,
    "moduleFileExtensions": ["js", "json"],
    setupFiles: ['<rootDir>/jest.setup.cjs'],
    coveragePathIgnorePatterns: [
        '<rootDir>/test/helpers/',
        '<rootDir>/node_modules/',
    ],
    transformIgnorePatterns: [
        "node_modules/(?!(stringify-entities|character-entities-legacy|character-entities-html4)/)"
    ],
    "moduleNameMapper": {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/__mocks__/fileMock.js',
        '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
    },
    clearMocks: true,
};