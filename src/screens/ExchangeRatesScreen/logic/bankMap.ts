const getBankData = (code: string) => {
  switch (code) {
    case 'BOC':
      return {
        name: 'Bank of Ceylon',
        colorCodes: ['#FFFDE7', '#ffffff'],
        logo: require('@assets/images/boc.png'),
      };
    case 'COMMERCIAL':
      return {
        name: 'Commercial Bank',
        colorCodes: ['#E3F2FD', '#ffffff'],
        logo: require('@assets/images/combank.png'),
      };

    case 'PEOPLES':
      return {
        name: 'Peoples Bank',
        colorCodes: ['#FFF3E0', '#ffffff'],
        logo: require('@assets/images/peoples_bank.png'),
      };

    case 'SAMPATH':
      return {
        name: 'Sampath Bank',
        colorCodes: ['#FBE9E7', '#ffffff'],
        logo: require('@assets/images/sampath.png'),
      };
    case 'CBSL':
      return {
        name: 'Central Bank of Sri Lanka',
        colorCodes: ['#FFEBEE', '#ffffff'],
        logo: require('@assets/images/cbsl_bank.png'),
      };
    case 'HNB':
      return {
        name: 'Hatton National Bank',
        colorCodes: ['#B3E5FC', '#ffffff'],
        logo: require('@assets/images/hnb.jpg'),
      };
    case 'NTB':
      return {
        name: 'Nations Trust Bank',
        colorCodes: ['#F8BBD0', '#ffffff'],
        logo: require('@assets/images/ntb.jpg'),
      };
    case 'NDB':
      return {
        name: 'National Development Bank',
        colorCodes: ['#CFD8DC', '#ffffff'],
        logo: require('@assets/images/ndb.jpeg'),
      };
    case 'AMANA':
      return {
        name: 'Amãna Bank',
        colorCodes: ['#C8E6C9', '#ffffff'],
        logo: require('@assets/images/amana.jpg'),
      };
    default:
      return {
        name: code,
        colorCodes: ['#ffffff', '#ffffff'],
        logo: require('@assets/images/placeholder.jpg'),
      };
  }
};

export {getBankData};
