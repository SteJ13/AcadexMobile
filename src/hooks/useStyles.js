import { useTheme } from '../context/ThemeContext';
import { useMemo } from 'react';

export const useStyles = (makeStyles) => {
    const { theme } = useTheme();

    const styles = useMemo(() => makeStyles(theme), [makeStyles, theme]);

    return styles;
};
