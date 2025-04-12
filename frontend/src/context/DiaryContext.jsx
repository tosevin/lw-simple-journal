import { createContext, useReducer, useContext } from 'react';


const DiaryDateContext = createContext();


const initialState = { selectedDate: null };

const diaryDateReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SELECTED_DATE':
            return { selectedDate: action.payload };

        default:
            console.error(`发生了错误: ${action.type}`); 
            return state;
    }
};


export const DiaryDateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(diaryDateReducer, initialState);

    return (
        <DiaryDateContext.Provider value={{ ...state, dispatch }}>
            {children}
        </DiaryDateContext.Provider>
    );
};


export const useDiaryDate = () => {
    const context = useContext(DiaryDateContext);
    if (context === undefined) {
        throw new Error('useDiaryDate must be used within a DiaryDateProvider');
    }
    return context;
};
