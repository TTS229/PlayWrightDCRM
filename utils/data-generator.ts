import { DUBAI_CITIES } from '../test-data/masterData/cities';
import { PROPERTY_TYPES } from '../test-data/masterData/projectType';
import { LEAD_FUNNELS } from '../test-data/masterData/leadFunnel';
import { CycleUtility } from './cycleUtility';

export class DataGenerator {

    private static counter = 1;

    static generateLeadData(environment: string = 'dubai') {

        const id =
            String(this.counter++)
                .padStart(3, '0');

        const cities = environment === 'dubai' ? DUBAI_CITIES : DUBAI_CITIES;
        const city = CycleUtility.next('cities', cities);
        const propertyType = CycleUtility.next('propertyTypes', PROPERTY_TYPES);
        const leadFunnel = CycleUtility.next('leadFunnels', LEAD_FUNNELS);
        
        // Cycle through channels
        const channels = ['Online', 'Offline', 'Referral'];
        const channel = CycleUtility.next('channels', channels);
        
        // Cycle through sources
        const sources = ['Website', 'Email', 'Phone', 'In-Person'];
        const source = CycleUtility.next('sources', sources);
        
        // Cycle through campaign sources
        const campaignSources = ['Campaign 1', 'Campaign 2', 'Campaign 3'];
        const campaignSource = CycleUtility.next('campaignSources', campaignSources);
        
        // Cycle through lead sources
        const leadSources = ['Organic', 'Paid', 'Referral', 'Direct'];
        const leadSource = CycleUtility.next('leadSources', leadSources);

        return {

            // Mandatory Fields
            firstName: `CRM Test ${id}`,

            countryCode: '+971',

            phone: `5${Math.floor(
                Math.random() * 100000000
            ).toString().padStart(7, '0')}`,

            city: city,

            propertyType: propertyType,

            channel: channel,

            leadFunnel: leadFunnel,

            source: source,

            campaignSource: campaignSource,

            leadSource: leadSource
        };
    }
}