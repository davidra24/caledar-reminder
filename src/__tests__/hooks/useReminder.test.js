import {useInsertReminder} from '../../hooks/useReminder'
import { useReminderMock } from "../../__mocks__/hooks/useReminder.mock";
import { renderHook } from '@testing-library/react-hooks';

describe('useInsertReminder Hook', () => {
    test('Insert reminder', () => {
        const { 
            yearMock,
            monthMock,
            dayMock,
            textMock,
            cityMock,
            colorMock,
            dispatchMock,
            timeMock,
            positionMock
        } = useReminderMock
        renderHook(() => useInsertReminder(yearMock,
            monthMock,
            dayMock,
            textMock,
            cityMock,
            colorMock,
            dispatchMock,
            timeMock,
            positionMock)
        )
        expect(localStorage.store).toEqual(undefined)
        //expect(localStorage.store).toEqual({"2021": {"5": {"18": [{"text": textMock, "city": cityMock, "time": timeMock, "color": colorMock}]}}})

    })
})