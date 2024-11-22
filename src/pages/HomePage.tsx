import { useEffect, useState } from "react";
import EnhancedTable from "../components/Table";
import { getAllCountry } from "../services/countryService";
import DataModal from "../components/Modal";

interface Data {
    id: number;
    idd: string;
    flags: string;
    cca2: string;
    cca3: string;
    name: string;
    native_name: string;
    alternativ_name: Array<string>;
}


const HomePage = () => {
    const [countries, setCountries] = useState<Array<Data>>([]);
    const [countryDetail, setCountryDetail] = useState<Data>({} as Data);
    const [filteredCountries, setFilteredCountries] = useState<Array<Data>>([]);
    const [searchValue, setSearchValue] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSearch = (value: string) => {
        setSearchValue(value);
    };

    const handleOpenModal = (id: number) => {
        if (id !== undefined && id) {
            setCountryDetail(countries[id]);
            setIsModalOpen(true);
        }
    };
    const handleCloseModal = () => setIsModalOpen(false);

    useEffect(() => {
        async function fetchAndFilterCountries() {
            try {
                // Fetch countries only if not already fetched
                let allCountries = [...countries];
                if (countries.length === 0) {
                    const res = await getAllCountry();
                    allCountries = res.map((data: any, index: number) => ({
                        id: index, // Use the index as the ID
                        idd: data.idd?.root || "",
                        flags: data.flags?.png || "",
                        cca2: data.cca2,
                        cca3: data.cca3,
                        name: data.name.official,
                        native_name: data.name.common,
                        alternativ_name: data.altSpellings || [],
                    }));
                    setCountries(allCountries);
                }

                // Filter countries based on the search value
                const filtered = searchValue.trim()
                    ? allCountries.filter((country) =>
                        country.name.toLowerCase().includes(searchValue.toLowerCase())
                    )
                    : allCountries;

                setFilteredCountries(filtered);
            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        }

        fetchAndFilterCountries();
    }, [searchValue, countries]); // Depend on `searchValue` and `countries`

    return (
        <div className="container mx-auto p-4">
            <EnhancedTable
                rows={filteredCountries}
                onSearch={handleSearch}
                openModal={handleOpenModal}
            />
            <DataModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                data={countryDetail}
            />
        </div>
    );
};

export default HomePage;
