using System.Collections;
using System.Collections.Generic;
using System.Net.Sockets;
using UnityEngine;

public class PipeMoveScript : MonoBehaviour
{
    // Hvor hurtigt en pipe kan bevæge sig 
    public float moveSpeed = 5;
    // Afgrænsningen til at slette objektet
    public float deadZone = -40;

    // Start is called before the first frame update
    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {
        /* Får objektet til at bevæge sig mod venstre. Det bruger Vector3, så movespeed ganges med Vector3.left, for at få movespeed mod venstre i Vector3 format.
         * Det ganges med deltaTime, og giver hvor mange enheder med venstre den skal rykke, og lægger så det til positionen */
        /* Koden køres så hurtigt og ofte som muligt, og køre derfor med forskellige hastigheder på forskellige maskiner. DeltaTime giver antallet af sekunder mellem hver frame.
         * Uden at gange med deltaTime, ville flytningen af x positionen være dem samme, og hurtigere maskiner ville gå igennem Koden oftere, og derved flytte
         * positionen oftere. Ved at gange movespeed med deltaTime vil hurtigere maskiner få en mindre afstand, og langsommere, en større. */
        transform.position = transform.position + (Vector3.left * moveSpeed) * Time.deltaTime;

        // Når objektet er flyttet langt nok til venstre, slettes den
        if (transform.position.x < deadZone)
        {
            Debug.Log("Pipe Deleted");
            Destroy(gameObject);
        }
    }
}
