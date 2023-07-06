<script lang="ts">
    import { supportedFoundryVersions } from '$lib/foundryVersions';

    export let data;
    let { session } = data;
</script>

<header class="hero">
    <hgroup>
        <h1>Roll With It</h1>
        <h2>Managed FoundryVTT Hosting</h2>
    </hgroup>

    <p>
        {#if session}
            <a href="/dashboard" role="button">Go to the Dashbaord</a>
        {:else}
            <a href="/signup" role="button">Sign Up</a>
        {/if}
    </p>
</header>

<main class="container">
    <section id="pricing">
        <hgroup>
            <h1>Pricing</h1>
            <h2>Simple and Clean</h2>
        </hgroup>

        <div class="grid">
            {#each Array(3) as _}
                <article>
                    <header>
                        <hgroup>
                            <h2>The Only Plan</h2>
                            <h3>$30 per year</h3>
                        </hgroup>
                    </header>

                    <table>
                        <thead>
                            <tr>
                                <th>Features</th>
                            </tr>
                        </thead>

                        <tr>
                            <td>✅ 10GB of Storage</td>
                        </tr>

                        <tr>
                            <td>✅ 2 CPU Cores</td>
                        </tr>

                        <tr>
                            <td>✅ 4GB of RAM</td>
                        </tr>

                        <tr>
                            <td>✅ Secure Login</td>
                        </tr>

                        <tr>
                            <td>✅ Full Admin Access</td>
                        </tr>

                        <tr>
                            <td>✅ Daily Backups</td>
                        </tr>
                    </table>

                    {#if !session}
                        <footer>
                            <a href="/signup" role="button">Get Started</a>
                        </footer>
                    {/if}
                </article>
            {/each}
        </div>
    </section>

    <section id="testimonials">
        <hgroup>
            <h1>Testimonials</h1>
            <h2>Do other people like us?</h2>
        </hgroup>

        <div class="grid">
            <blockquote>
                When the story your players tell themselves starts to eclipse your own.
                <footer>
                    <cite>Angsty Boi</cite>
                </footer>
            </blockquote>

            <blockquote>
                That moment when you spend week planning out an intercut puzzle, just for the
                players to decide today was the day to take the renegade route.
                <footer>
                    <cite>Sad Child</cite>
                </footer>
            </blockquote>

            <blockquote>
                I think I actually hate these people.
                <footer>
                    <cite>Miffed Gal</cite>
                </footer>
            </blockquote>
        </div>
    </section>

    <section id="faq">
        <hgroup>
            <h1>Got any questions?</h1>
            <h2>Here are some frequently asked ones.</h2>
        </hgroup>

        <details>
            <summary>Which versions of Foundry are supported?</summary>
            We support the following versions:
            <ul>
                {#each supportedFoundryVersions as ver}
                    <li>{ver}</li>
                {/each}
            </ul>
            <p />
        </details>

        <details>
            <summary>Why is there only one plan?</summary>
            There's not really much else to do except offer you a shitty experience. Storage is cheap
            enough that offering less would barely impact your price, offering less compute would lead
            to a bad experience, and the fixed costs are, well, fixed. If you want a breakdown of those,
            see the question below this one.
        </details>

        <details>
            <summary>What do I do if I run out of storage?</summary>
            <p>
                There are plans to expand the amount of storage available in "The Only Plan" in the
                future. Due to the cost of storage, we have to explore alternative (ie. cheaper)
                storage systems. These would be less performant, but not by much.
            </p>

            <p>
                For those willing to pay more, we may open up the option to pay for more storage.
                This would be at cost, so $1 per 10GB per month.
            </p>
        </details>

        <details>
            <summary>How much does this cost <em>you</em>?</summary>
            Here's the breakdown for monthly fixed costs:

            <table>
                <thead>
                    <tr>
                        <td>Component</td>
                        <td>Unit Cost</td>
                        <td>Quantity</td>
                        <td>Total Cost</td>
                    </tr>
                </thead>

                <tr>
                    <td>Database</td>
                    <td>$30</td>
                    <td>2</td>
                    <td>$60</td>
                </tr>

                <tr>
                    <td>Web Server</td>
                    <td>$27</td>
                    <td>4</td>
                    <td>$108</td>
                </tr>

                <tr>
                    <td>Node Scheduler</td>
                    <td>$27</td>
                    <td>3</td>
                    <td>$81</td>
                </tr>

                <tr>
                    <td>Traefik Router</td>
                    <td>$84</td>
                    <td>2</td>
                    <td>$168</td>
                </tr>

                <tfoot>
                    <td>Total</td>
                    <td />
                    <td />
                    <td>$1000</td>
                </tfoot>
            </table>

            And here's an approximate breakdown of the per user cost:

            <table>
                <thead>
                    <tr>
                        <td>Component</td>
                        <td>Cost</td>
                    </tr>
                </thead>
                <tr>
                    <td>Storage</td>
                    <td>$1.00 per 10GB per month</td>
                </tr>

                <tr>
                    <td>Compute</td>
                    <td>$0.94 per 20h per month</td>
                </tr>

                <tfoot>
                    <td>Total</td>
                    <td>$1.94 per month</td>
                </tfoot>
            </table>

            The reason we're able to offer this service for less than $3 per month is because of
            something called over provisioning. Let's say 100 people sign up. Not all of them will
            play at once, but maybe 50 will. This means that I don't have to have enough servers for
            100 people, I only need enough servers for 50 people. Since TTRPG games are generally
            weekly affairs, this means that we don't actually need enough servers for 50 people at
            all times. We can instead scale down to save even more money.
        </details>

        <details>
            <summary>Wow, this site is really simple.</summary>
            That's the pont! Instead of trying to cram every feature in under a dozen pages, I wanted
            to make a website with a single purpose: managing your Foundry VTT installation.
        </details>
    </section>
</main>
