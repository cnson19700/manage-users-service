/* eslint-disable prettier/prettier */
module.exports = {
    preset: 'ts-jest',
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: 'src',
    testRegex: ['.*\\.spec\\.ts$', '.*\\.e2e\\.ts$'],
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
        '.(ts|tsx)': 'ts-jest',
    },
    collectCoverageFrom: ['<rootDir>/controllers/*.controller.(t|j)s', '<rootDir>/services/*.service.(t|j)s', '<rootDir>/models/*.model.(t|j)s', '<rootDir>/repositories/*.repository.(t|j)s', '<rootDir>/pipes/*.pipe.(t|j)s', '<rootDir>/repositories/repository.(t|j)s'],
    globals: {
        'ts-jest': {
            compiler: 'ttypescript',
        },
    },
    globalSetup: '<rootDir>/core/test/globalSetup.ts',
    moduleDirectories: [
        ".",
        "src",
        "src/util",
        "node_modules",
        "config"
    ],
    coverageDirectory: '../coverage',
    testEnvironment: 'node',
    coveragePathIgnorePatterns: ['<rootDir>/main.ts', '<rootDir>/router.ts', '<rootDir>/app', '<rootDir>/utils/logger', '<rootDir>/utils/repository', '<rootDir>/utils/validator', '<rootDir>/test', '<rootDir>/services/logger.service.(t|j)s', '<rootDir>/services/db.service.(t|j)s'],
};
