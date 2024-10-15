<p>Congratulations. Your initial setup is complete!</p>

<style>
    td{
        padding:10px;
    }
</style>


    <table border='1'>
        <tr><td>姓名</td><td>電話</td></tr>
    <?php 
        foreach($data as $row)
        {
            echo '<tr><td>'.  $row['name'] . '</td><td> ' . $row['phone'] . '</td></tr>';
        }
    ?>
    </table>
