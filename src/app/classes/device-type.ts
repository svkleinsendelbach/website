export class DeviceType {
  private rawValue: DeviceType.RawValue;

  public constructor() {
    this.rawValue = DeviceType.currentRawValue;
  }

  private static get currentRawValue(): DeviceType.RawValue {
    return DeviceType.RawValue.tablet;
    const userAgent = navigator.userAgent;
    const tabletRegex = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i;
    const mobileRegex =
      /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/;
    if (tabletRegex.test(userAgent)) {
      return DeviceType.RawValue.tablet;
    } else if (mobileRegex.test(userAgent)) {
      return DeviceType.RawValue.mobile;
    }
    return DeviceType.RawValue.desktop;
  }

  public get isMobile(): boolean {
    return this.rawValue === DeviceType.RawValue.mobile;
  }

  public get isTablet(): boolean {
    return this.rawValue === DeviceType.RawValue.tablet;
  }

  public get isDesktop(): boolean {
    return this.rawValue === DeviceType.RawValue.desktop;
  }

  public get stringValue(): 'mobile' | 'tablet' | 'desktop' {
    switch (this.rawValue) {
      case DeviceType.RawValue.mobile:
        return 'mobile';
      case DeviceType.RawValue.tablet:
        return 'tablet';
      case DeviceType.RawValue.desktop:
        return 'desktop';
    }
  }
}

export namespace DeviceType {
  export enum RawValue {
    tablet,
    mobile,
    desktop,
  }
}
