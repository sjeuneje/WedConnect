function extractCities(data: { zip: string; city: string; lng: number; lat: number }[]): string[] {
    const citiesSet = new Set<string>();
    data.forEach((item) => citiesSet.add(item.city));
    return Array.from(citiesSet);
}

export {
    extractCities
}
