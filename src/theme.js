import {createMuiTheme, responsiveFontSizes} from "@material-ui/core";

// colors
const secondary = "rgb(8,27,48)";
const black = "#688fb7";
const darkBlack = "rgb(10,31,59)";
const lightBlack = "rgb(42,48,55)";
const backgroundLightBlack = "rgb(8,27,48)";
const warningLight = "rgba(253, 200, 69, .3)";
const white = "rgb(254,255,255)";
const warningMain = "rgba(253, 200, 69, .5)";
const warningDark = "rgba(253, 200, 69, .7)";

// border
const borderWidth = 2;
const borderColor = "rgba(0, 0, 0, 0.13)";

// breakpoints
const xl = 1920;
const lg = 1280;
const md = 960;
const sm = 600;
const xs = 0;

// spacing
const spacing = 4;

const theme = createMuiTheme({
    palette: {
        background: {
            dark: darkBlack,
            default: backgroundLightBlack,
            paper: lightBlack
        },
        primary: {
            light: '#d4be73',
            main: '#ffb74d',
            dark: '#ffb300',
        },
        text: {
            primary: white,
            secondary: white,
            link: white
        },
        secondary: {main: secondary},
        common: {
            black,
            darkBlack,
            lightBlack,
        },
        warning: {
            light: warningLight,
            main: warningMain,
            dark: warningDark
        },
        // Used to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        tonalOffset: 0,
        spacing,
    },
    breakpoints: {
        // Define custom breakpoint values.
        // These will apply to Material-UI components that use responsive
        // breakpoints, such as `Grid` and `Hidden`. You can also use the
        // theme breakpoint functions `up`, `down`, and `between` to create
        // media queries for these breakpoints
        values: {
            xl,
            lg,
            md,
            sm,
            xs
        }
    },
    border: {
        borderColor: borderColor,
        borderWidth: borderWidth
    },
    overrides: {
        MuiExpansionPanel: {
            root: {
                position: "fluid"
            }
        },
        MuiTableCell: {
            root: {
                paddingLeft: spacing * 2,
                paddingRight: spacing * 2,
                borderBottom: `${borderWidth}px solid ${borderColor}`,
                [`@media (max-width:  ${sm}px)`]: {
                    paddingLeft: spacing,
                    paddingRight: spacing
                }
            }
        },
        MuiDivider: {
            root: {
                backgroundColor: borderColor,
                height: borderWidth
            }
        },
        MuiPrivateNotchedOutline: {
            root: {
                borderWidth: borderWidth
            }
        },
        MuiListItem: {
            divider: {
                borderBottom: `${borderWidth}px solid ${borderColor}`
            }
        },
        MuiDialog: {
            paper: {
                width: "100%",
                maxWidth: 430,
                marginLeft: spacing,
                marginRight: spacing
            }
        },
        MuiTooltip: {
            tooltip: {
                backgroundColor: darkBlack
            }
        },
        MuiExpansionPanelDetails: {
            root: {
                [`@media (max-width:  ${sm}px)`]: {
                    paddingLeft: spacing,
                    paddingRight: spacing
                }
            }
        }
    },
    typography: {
        useNextVariants: true
    }
});

export default responsiveFontSizes(theme);
