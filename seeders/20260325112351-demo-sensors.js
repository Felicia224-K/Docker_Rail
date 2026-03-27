
'use strict';

module.exports = {
  async up(queryInterface) {
    // 1. Insert sensors and get their real IDs back
    await queryInterface.bulkInsert('sensors', [
      { 
        name: 'Living Room Temp',
          type: 'temperature',
          value: 22.5, 
          unit: '°C',  
          isActive: true, 
          userId: 1, 
          createdAt: new Date(), 
          updatedAt: new Date() 
      },

      { 
        name: 'Garden Humidity',   
        type: 'humidity',    
        value: 65.0, unit: '%',   
        isActive: true, 
        userId: 1, 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },

      { 
        name: 'Garage Light',      
        type: 'light',       
        value: 300,  
        unit: 'lux', 
        isActive: true, 
        userId: 2, 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },

      { 
        name: 'Basement Pressure', 
        type: 'pressure',    
        value: 1013, 
        unit: 'hPa', 
        isActive: true, 
        userId: 2, 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },

      { 
        name: 'Bedroom Temp',      
        type: 'temperature', 
        value: 19.0, 
        unit: '°C',  
        isActive: true, 
        userId: 3, 
        createdAt: new Date(), 
        updatedAt: new Date() 
      }

    ]);

    // 2. Fetch the real IDs from the database
    const [sensors] = await queryInterface.sequelize.query(
      `SELECT id, name FROM sensors ORDER BY id DESC LIMIT 5`
    );
    const [tags] = await queryInterface.sequelize.query(
      `SELECT id, name FROM tags`
    );

    // 3. Map by name so we don't rely on hardcoded IDs
    const s = {};
    sensors.forEach(row => { s[row.name] = row.id; });

    const t = {};
    tags.forEach(row => { t[row.name] = row.id; });

    // 4. Insert sensor_tags using real IDs
    await queryInterface.bulkInsert('sensor_tags', [
      { 
        sensorId: s['Living Room Temp'],  
        tagId: t['indoor'],    
        createdAt: new Date(), 
        updatedAt: new Date() 
      },

      { 
        sensorId: s['Living Room Temp'],  
        tagId: t['critical'],  
        createdAt: new Date(), 
        updatedAt: new Date() 
      },

      { 
        sensorId: s['Garden Humidity'],   
        tagId: t['outdoor'],   
        createdAt: new Date(), 
        updatedAt: new Date() 
      },

      { 
        sensorId: s['Garage Light'],      
        tagId: t['garage'],    
        createdAt: new Date(), 
        updatedAt: new Date() 
      },

      { 
        sensorId: s['Garage Light'],      
        tagId: t['low-power'], 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },

      { 
        sensorId: s['Basement Pressure'], 
        tagId: t['indoor'],    
        createdAt: new Date(), 
        updatedAt: new Date() 
      },

      { 
        sensorId: s['Bedroom Temp'],      
        tagId: t['indoor'],    
        createdAt: new Date(), 
        updatedAt: new Date() 
      },

      { 
        sensorId: s['Bedroom Temp'],      
        tagId: t['low-power'], 
        createdAt: new Date(), 
        updatedAt: new Date() 
      }
      
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('sensor_tags', null, {});
    await queryInterface.bulkDelete('sensors',     null, {});
  }
};