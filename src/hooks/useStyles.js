import { useTheme } from '../context/ThemeContext';
import { useMemo } from 'react';

const useStyles = (makeStyles) => {
    const { theme } = useTheme();

    const styles = useMemo(() => makeStyles(theme), [makeStyles, theme]);

    return styles;
};
export default useStyles;