export class RestaurentData {
    id: string = '';        // Unique identifier for the restaurant, typically from the backend
    name: string = '';      // Name of the restaurant
    address: string = '';   // Address of the restaurant
    email: string = '';     // Email address
    services: string = '';  // Services offered by the restaurant
    mobile: string = '';    // Mobile number as a string (to handle leading zeros)

    constructor(data?: Partial<RestaurentData>) {
        // Initialize properties with provided data or default values
        this.id = data?.id ?? '';
        this.name = data?.name ?? '';
        this.address = data?.address ?? '';
        this.email = data?.email ?? '';
        this.services = data?.services ?? '';
        this.mobile = data?.mobile ?? ''; // Initialize as string for consistency
    }
}
