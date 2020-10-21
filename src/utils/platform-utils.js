let computedPlatforms = null;

export function isPlatform(name){
    if (!window || !window.navigator) return false;
    if (!computedPlatforms){
        const ua = window.navigator.userAgent;
        const ie = /Edge\/|Trident\/|MSIE /.test(ua);
        const ios = !ie && /AppleWebKit/.test(ua) && /Mobile\/\w+/.test(ua);
        const mac = ios || /mac/i.test(window.navigator.platform);
        const safari = /apple/i.test(window.navigator.vendor)
        computedPlatforms = {
            ie,
            mac,
            safari,
            ios
        };
    }
    return computedPlatforms[name];
}

export function isPlatformCtrlClick(e){
    let flip = isPlatform('mac');
    return flip ? e.metaKey : e.ctrlKey;
}
