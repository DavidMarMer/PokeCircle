if (typeof java === 'undefined') {
    console.log("Java is not installed.");
} else {
    console.log("java.version " + java.lang.System.getProperty("java.version"));
}