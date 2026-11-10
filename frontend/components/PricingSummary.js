import { getPricingData } from '../data/siteData';
import styles from '../styles/Acquisition.module.scss';
const dollars = value => `$${value.toLocaleString('en-US')}`;
export default function PricingSummary({ group = 'web' }) {
  const { plans } = getPricingData(group);
  return <div className={styles.pricing}>
    <div className={styles.tableScroll}><table>
      <caption>{group === 'ai' ? 'AI' : 'Web'} packages: project totals and recurring support</caption>
      <thead><tr><th scope="col">Package</th><th scope="col">Project setup total</th><th scope="col">Monthly support</th></tr></thead>
      <tbody>{plans.map(plan => <tr key={plan.title}><th scope="row">{plan.title}</th><td>{dollars(plan.setupPrice)}</td><td>{dollars(plan.monthlySupport)}/month</td></tr>)}</tbody>
    </table></div>
    <p>The existing six-month payment option spreads the setup total across six payments. The project total above is authoritative; rounded estimates may need a final-payment adjustment. Monthly support is a separate recurring cost. We confirm the payment schedule, scope, third-party costs, and ongoing support in your proposal. Custom applications and integrations require a scope-specific quote.</p>
  </div>;
}
