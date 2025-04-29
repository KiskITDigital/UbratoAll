import { FC, useEffect } from "react";
import { DateRangePicker } from "@nextui-org/date-picker";
import styles from './DateRangePickerLocal.module.css'
import { RangeValue, CalendarDate } from "@nextui-org/react";
import { useCreateTenderState } from "@/store/createTenderStore";
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";

const DateRangePickerLocal: FC<{
    timeToChangeStart: 'reception_start' | 'work_start',
    timeToChangeEnd: 'reception_end' | 'work_end',
    state: boolean,
    setState: (newVal: boolean) => void
}> = ({ timeToChangeStart, timeToChangeEnd, state, setState }) => {
    const createTenderState = useCreateTenderState();

    const classNames = {
        base: styles["base"],
        label: styles["label"],
        calendar: styles["calendar"],
        selectorButton: styles["selector-button"],
        selectorIcon: styles["selector-icon"],
        popoverContent: styles["popover-content"],
        calendarContent: styles["calendar-content"],
        inputWrapper: styles["input-wrapper"],
        innerWrapper: styles["inner-wrapper"],
        startInput: styles["start-input"],
        endInput: styles["end-input"],
        input: styles["input"],
        segment: styles["segment"],
        separator: styles["separator"],
        bottomContent: styles["bottom-content"],
        timeInputWrapper: styles["time-input-wrapper"],
        helperWrapper: styles["helper-wrapper"],
        headerWrapper: styles["header-wrapper"],
        description: styles["description"],
        errorMessage: styles["error-message"],
        gridBodyRow: styles["grid-body-row"],
        gridBody: styles["grid-body"],
        header: styles["header"]
    };

    useEffect(() => {
        if (createTenderState.work_start.getTime() < createTenderState.reception_end.getTime()) {
            createTenderState.handleSimpleInput('work_start', createTenderState.reception_end);
            if (createTenderState.work_end.getTime() < createTenderState.reception_end.getTime()) {
                createTenderState.handleSimpleInput('work_end', createTenderState.reception_end);
            }
        }
    }, [createTenderState, createTenderState.reception_end]);

    return (
        <DateRangePicker
            aria-label="calendar"
            minValue={timeToChangeStart === 'work_start' ? parseDate(createTenderState.reception_end.toISOString().split('T')[0]) : today(getLocalTimeZone())}
            maxValue={parseDate("2030-01-01")}
            labelPlacement="outside-left"
            isOpen={state}
            value={{
                start: parseDate(createTenderState[timeToChangeStart].toISOString().split('T')[0]),
                end: parseDate(createTenderState[timeToChangeEnd].toISOString().split('T')[0])
            }}
            onChange={(newVal: RangeValue<CalendarDate>) => {
                setState(false)

                const firstDate = new Date(newVal.start.year, newVal.start.month - 1, newVal.start.day, 3);
                const secondDate = new Date(newVal.end.year, newVal.end.month - 1, newVal.end.day, 3);
                if (firstDate.getFullYear() > 2030 || firstDate.getFullYear() < new Date().getFullYear() || secondDate.getFullYear() > 2030 || secondDate.getFullYear() < new Date().getFullYear()) return;
                createTenderState.handleSimpleInput(timeToChangeStart, firstDate);
                createTenderState.handleSimpleInput(timeToChangeEnd, secondDate);
            }}
            classNames={classNames}
        />
    );
}

export default DateRangePickerLocal;
