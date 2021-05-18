import { configure } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { LocalStorageMock } from "../__mocks__/localStorageMock";

configure({ adapter: new Adapter() });
//global.fetch = require('jest-fetch-mock')

global.localStorage = new LocalStorageMock;

test('True', () => {
    expect(true).toBeTruthy()
})